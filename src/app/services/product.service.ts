import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProductModule } from './../modules/product.module';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const BACKEND_API = environment.API_URL + '/products/';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: ProductModule[];
  productsUpdated = new Subject<{products: ProductModule[], proCount: number}>();

  constructor( private http: HttpClient ) { }

  // get All products
  getAllProducts(postsPerPage: number, currentPage: number) {

  }

  getAllProductsUpdatedListener() {
    return this.productsUpdated.asObservable();
  }

  // get only one product
  getPro(productsId) {
    return {...this.products.find(p => p.id === productsId)};
  }

  // add and save new  product
  addPro( proData ) {
    return this.http.post<{ newProductID: string, message: string}>(
      BACKEND_API, proData
      );
  }

//  save updates to save
  updatePro(productId, proData) {

  }

//  save updates to save
updateProState(productId, proDataState) {
  console.log('==>', productId, proDataState);
  return this.http.put<{ message: string}>(
    BACKEND_API + '/state/' + productId, proDataState
    );
}


// delet product by id
  deletePro(productId)  {

  }




}
