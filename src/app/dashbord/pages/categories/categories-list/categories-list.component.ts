import { CategoriesService } from './../../../../services/categories.service';
import { CategoryModule } from './../../../../modules/category.module';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit, OnDestroy {

  categories: CategoryModule[] = [];
  cateSubs:   Subscription;

  totalPosts = 0;
  postsPerPage = 15;
  currentPage = 1;
  pageSizeOptions = [5, 15, 20, 25];

  showCategory = true;


  constructor(private cateService: CategoriesService,
    private _flashMessagesService: FlashMessagesService) {}

  ngOnInit() {
    this.cateService.getAllCates(this.postsPerPage, this.currentPage);
    this.cateSubs = this.cateService.getAllCatesUpdatedListener()
    .subscribe((categoryData: {categories: CategoryModule[], cateCount: number}) => {
      console.log(categoryData.categories, ' => Add Categories ngOnInit');
      this.categories = categoryData.categories;
      this.totalPosts = categoryData.cateCount;
    });
  }

  onChangedPage(pageData: PageEvent) {
    console.log('pageData', pageData);
    this.currentPage =  pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.cateService.getAllCates(this.postsPerPage, this.currentPage);
  }

  changeCateState(catid, event) {
    const categoryState = {
      id:          catid,
      showCategory: event.checked,
    };
    if (confirm('Are you sure ' +  event.checked + ' ?') ) {
      this.cateService.updateCateSatu(catid, categoryState).subscribe(
        msg => {
          this.cateService.getAllCates(this.postsPerPage, this.currentPage);
          this._flashMessagesService.show( msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
        },
        err => {
          console.log('err.error=>', err.error.message);
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });
    }
  }

  onDelete(id: string, categoryName: string) {
    if (confirm('Are you sure you want to delete ' + categoryName + ' ?') ) {
      this.cateService.deleteCate(id).subscribe(
        msg => {
          this.cateService.getAllCates(this.postsPerPage, this.currentPage);
          this._flashMessagesService.show( msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
        },
        err => {
          console.log('err.error=>', err.error.message);
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });
    }
  }

  ngOnDestroy() {
    this.cateSubs.unsubscribe();
  }







}
