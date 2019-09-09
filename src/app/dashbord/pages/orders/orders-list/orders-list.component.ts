import { FlashMessagesService } from 'angular2-flash-messages';
import { OrderModule } from './../../../../modules/order.module';
import { OrdersService } from './../../../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { ProductModule } from '../../../../modules/product.module';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders: OrderModule[];


  constructor( private orderService: OrdersService, private _flashMessagesService: FlashMessagesService ) { }

  ngOnInit() {
    this.orderService.getAllOrders();
    this.orderService.getAllOrdersUpdatedListener()
      .subscribe(
        orders => {
          console.log(' orders =>', orders);
          this.orders = orders;
         }
      );
  }

  onOrderState(orderID: string, orderProducts: OrderModule) {
    console.log(orderID);
    const data = {
      id:       orderID,
      active:   true,
      products: orderProducts,
    };
    this.orderService.orderState(orderID, data)
      .subscribe(
        msg => {
          this._flashMessagesService.show( msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
          this.orderService.getAllOrders();
        },
        err => {
          console.log('err.error=>', err.error.message);
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });
  }

  onDeleteOrder(orderId: string) {
    if (confirm('Are you sure you want to delete ' + orderId + '?') ) {
      this.orderService.deleteOrder(orderId).subscribe(
        msg => {
          this._flashMessagesService.show( msg.message, { cssClass: 'alert-success flash-message', timeout: 3000 });
          this.orderService.getAllOrders();
        },
        err => {
          console.log('err.error=>', err.error.message);
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });
    }
  }

}
