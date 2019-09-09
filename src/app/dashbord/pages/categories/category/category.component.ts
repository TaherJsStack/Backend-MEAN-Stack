import { CategoriesService } from './../../../../services/categories.service';
import { CategoryModule } from './../../../../modules/category.module';
import { ActivatedRoute, Params, Router, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: CategoryModule;
  paramsId: string;
  currentPage;
  postsPerPage;

  constructor( private route:       ActivatedRoute,
               private cateService: CategoriesService,
               private router:      Router,
               private _flashMessagesService: FlashMessagesService ) { }

  ngOnInit() {

    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
        if ( paramMap.has('id') ) {
          const paramsId   = paramMap.get('id');
          console.log( paramsId );
          this.category =  this.cateService.getCate( paramsId );
          console.log( paramsId, ' => category.....');
        }
      });
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
    if (confirm('Are you sure you want to delete ' + categoryName + id + '?') ) {
      console.log(categoryName + id , ' Deleted Done...');
      this.cateService.deleteCate(id).subscribe( msg => {
        this.cateService.getAllCates(this.postsPerPage, this.currentPage);
        this.router.navigate(['/dashbord/pages/categories/categorieslist']);
        this._flashMessagesService.show( msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });

      });
    }
  }

}
