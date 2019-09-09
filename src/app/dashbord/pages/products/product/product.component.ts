import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { ProductService } from './../../../../services/product.service';
import { ProductModule } from './../../../../modules/product.module';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  // product: ProductModule;
  product;
  // paramsId;
  proPerPage;
  proCurrentPage;

  constructor(
    private proService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private _flashMessagesService: FlashMessagesService) {
     }

  ngOnInit() {
    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
        if ( paramMap.has('id') ) {
          const proID   = paramMap.get('id');
          console.log( proID );
          this.product =  this.proService.getPro( proID );
          console.log( proID, ' => category.....');
        }
      });
  }


  changeProState(proID, event) {
    const prodState = {
      id:          proID.toString(),
      showProduct: event.checked.toString(),
    };
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


  onDelete(id: string, productName: string) {
    if (confirm('Are you sure you want to delete ' + productName + id + '?') ) {
      this.proService.deletePro(id)
        .subscribe( msg => {
          this.proService.getAllProducts(this.proPerPage, this.proCurrentPage);
          this.router.navigate(['/dashbord/pages/products/productslist']);
          this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
        });
      console.log(productName + id , ' Deleted Done...');
   }
  }


}
