import { HttpClient } from '@angular/common/http';
import { OrderModule } from './../modules/order.module';
import { Injectable } from '@angular/core';
import { ProductModule } from '../modules/product.module';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const BACKEND_API =  environment.API_URL + '/orders/';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orders: OrderModule[] = [];
  ordersUpdated = new Subject<OrderModule[]>();

  constructor(private http: HttpClient) { }

  getAllOrders() {
    this.http.get<{ message: string, orders: OrderModule[] }>( BACKEND_API )
    .subscribe( ordersData => {
      this.orders = ordersData.orders;
      this.ordersUpdated.next([...this.orders]);
      // console.log(ordersData.message);
    });
  }

  getAllOrdersUpdatedListener() {
    return this.ordersUpdated.asObservable();
  }

  getOrder(orderId: string) {


  }

  orderState(orderID: string, orderState) {
    return this.http.put<{message: string}>( BACKEND_API + '/state/' + orderID, orderState );
  }

  deleteOrder(orderID: string) {
    return this.http.delete<{message}>( BACKEND_API + orderID );
  }


}
