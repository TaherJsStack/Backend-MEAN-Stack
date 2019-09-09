import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductModule } from './../../../../modules/product.module';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { PageEvent } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products:     ProductModule[] = [];
  productsSub:  Subscription;
  filtteredPro: any[];

  totalProducts = 0;
  proPerPage = 5;
  proCurrentPage = 1;
  proPageSizeOptions = [5, 15, 25, 30];

  constructor( private proService: ProductService,
               private _flashMessagesService: FlashMessagesService) {}

  ngOnInit() {
    this.proService.getAllProducts( this.proPerPage, this.proCurrentPage);
    this.productsSub = this.proService.getAllProductsUpdatedListener()
    .subscribe( (productData: {products: ProductModule[], proCount: number} )=> {
      this.totalProducts = productData.proCount;
      this.filtteredPro  = productData.products;
      this.products  = productData.products;
    });
  }

  serchFillter(query: string) {
    console.log(query);
    this.filtteredPro = (query) ?
      this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) ) :
      this.products;
  }

 // mat paginator
  onChangedPage(pageData: PageEvent) {
    console.log('pageData', pageData);
    this.proCurrentPage =  pageData.pageIndex + 1;
    this.proPerPage =      pageData.pageSize;
    this.proService.getAllProducts(this.proPerPage, this.proCurrentPage);
  }

  changeProState(proID, event) {
    const prodState = {
      id:          proID.toString(),
      showProduct: event.checked.toString(),
    };
    if (confirm('Are you sure ' +  event.checked + ' ?') ) {
      this.proService.updateProState(proID, prodState).subscribe(
        msg => {
          this.proService.getAllProducts(this.proPerPage, this.proCurrentPage);
          this._flashMessagesService.show( msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
        },
        err => {
          console.log('err.error=>', err.error.message);
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });
    }
  }


  onDelete(id: string, productName ) {
    if (confirm('Are you sure you want to delete ' + productName + id + '?') ) {
      this.proService.deletePro(id)
      .subscribe( msg => {
        this.proService.getAllProducts(this.proPerPage, this.proCurrentPage);
        this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });

      });
   }
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }

}
