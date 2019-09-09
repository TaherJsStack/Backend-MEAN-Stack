import { OrderModule } from './../../../../modules/order.module';
import { OrdersService } from './../../../../services/orders.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order: OrderModule;


  constructor(  private route:       ActivatedRoute,
                private ordersServ:  OrdersService,
                private router:      Router,
                private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {

    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
        if ( paramMap.has('id') ) {
          const paramsId   = paramMap.get('id');
          this.ordersServ.getOrder( paramsId )
            .subscribe( orderData => {
              this.order = orderData.order;
              console.log('orderData.order', orderData);
              this._flashMessagesService.show( orderData.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
            },
            err => {
              console.log('err.error=>', err.error.message);
              this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
            });
        }
      });

  }

}
