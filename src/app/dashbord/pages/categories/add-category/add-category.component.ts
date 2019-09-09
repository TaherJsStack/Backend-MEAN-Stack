import { UsersService } from './../../../../services/users.service';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { CategoryModule } from './../../../../modules/category.module';
import { CategoriesService } from './../../../../services/categories.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { PageEvent } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {


  // @ViewChild('category') categoryForm: NgForm;

  categories: CategoryModule[] = [];
  cate:   CategoryModule;
  cateSubs:   Subscription;
  editMode =  false;
  cateID:     string;
  cateForm:   FormGroup;
  paramsId;
  craetorName;

  totalPosts = 0;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [5, 15, 20, 25];

  showCategory = true;


  constructor(private cateService: CategoriesService,
              private route: ActivatedRoute,
              private _flashMessagesService: FlashMessagesService ) { }

  ngOnInit() {


    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
        if ( paramMap.has('id') ) {
          this.editMode = true;
          this.cateID   = paramMap.get('id');
          console.log(this.cateID);
          this.cate =  this.cateService.getCate(this.cateID);
          this.showCategory = this.cate.showCategory;
          console.log(this.cate, ' => category.....');
        } else {
          this.editMode = false;
          this.cateID   = null;
        }
      });

      this.cateService.getAllCates(this.postsPerPage, this.currentPage);
      this.cateSubs = this.cateService.getAllCatesUpdatedListener()
        .subscribe(
          (categoryData: {categories: CategoryModule[], cateCount: number}) => {
            console.log(categoryData.categories, ' => Add Categories ngOnInit');
            this.totalPosts = categoryData.cateCount;
            this.categories = categoryData.categories;
            // tslint:disable-next-line: max-line-length
            // this._flashMessagesService.show( categoryData.cateCount + 'category', { cssClass: 'alert-success flash-message', timeout: 3000 });

          }
        );


  } // end ngOnInIt

  onChangedPage(pageData: PageEvent) {
    console.log('pageData', pageData);
    this.currentPage =  pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.cateService.getAllCates(this.postsPerPage, this.currentPage);
    // this._flashMessagesService.show( 'chang Page !!', { cssClass: 'alert-success flash-message', timeout: 3000 });

  }

  changed(event) {
      // console.log('event =>', event);
      this.showCategory = event.checked;
      // console.log('this.showCategory =>', this.showCategory);
  }

  onSaveCategory(cateData: NgForm) {
    console.log(cateData.value);
    if ( this.editMode ) {
      const newCategoryData = {
        id:          this.cateID,
        name:        cateData.value.catname,
        description: cateData.value.catdesc,
        showCategory: this.showCategory,
        creatorId:   'creatorId',
        creatorName: 'creatorName',
        addedDate:   new Date,
      };
      this.cateService.updateCate(this.cateID, newCategoryData)
      .subscribe(
        msg => {
          this.cateService.getAllCates(this.postsPerPage, this.currentPage);
          this.editMode = false;
          this._flashMessagesService.show( msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
        },
        err => {
          console.log('err.error=>', err.error);
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });
      cateData.resetForm();
    } else {
      const category = {
        id:          null,
        name:        cateData.value.catname,
        description: cateData.value.catdesc,
        showCategory: this.showCategory,
        creatorId:   'creatorId',
        creatorName: 'creatorName',
        addedDate:   new Date,
      };
      // console.log('add category => ', category);
      this.cateService.addCate(category)
      .subscribe( msg => {
        this.cateService.getAllCates(this.postsPerPage, this.currentPage);
        this.editMode = false;
        this._flashMessagesService.show( msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
      }, err => {
        console.log('err.error=>', err.error);
        this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
      });
    }
    cateData.resetForm();
  }

  onEditCate(Id: string) {
    console.log(Id, ' => onEdit CategoryId ');
    this.cateID = Id;
    if ( this.cateID ) {
      this.editMode = true;
      this.cate = this.cateService.getCate(this.cateID);
      this.showCategory = this.cate.showCategory;
      console.log(this.cate);
    } else {
      this.editMode = false;
      this.cateID   = null;
    }
  }


  onDeleteCate(id: string, categoryName: string) {
    if (confirm('Are you sure you want to delete ' + categoryName + ' ?') ) {
      console.log(categoryName , ' Deleted Done...');
      this.cateService.deleteCate(id).subscribe( msg => {
        this.cateService.getAllCates(this.postsPerPage, this.currentPage);
        this._flashMessagesService.show( msg.message, { cssClass: 'alert-success flash-message', timeout: 1000 });

      });
   }
  }

  OnDestroy() {
    this.cateSubs.unsubscribe();
  }


}
