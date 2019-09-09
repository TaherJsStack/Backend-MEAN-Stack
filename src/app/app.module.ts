import { AuthInterceptor } from './services/auth-interceptor';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { CountoModule }  from 'angular2-counto';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';


import { DashbordComponent } from './dashbord/dashbord.component';
import { PagesComponent } from './dashbord/pages/pages.component';
import { SideMenuComponent } from './dashbord/side-menu/side-menu.component';
import { HomeComponent } from './dashbord/pages/home/home.component';
import { NavbarComponent } from './dashbord/navbar/navbar.component';

import { CategoriesComponent } from './dashbord/pages/categories/categories.component';
import { AddCategoryComponent } from './dashbord/pages/categories/add-category/add-category.component';
import { CategoryComponent } from './dashbord/pages/categories/category/category.component';
import { CategoriesListComponent } from './dashbord/pages/categories/categories-list/categories-list.component';

import { ProductsComponent } from './dashbord/pages/products/products.component';
import { AddProductComponent } from './dashbord/pages/products/add-product/add-product.component';
import { ProductComponent } from './dashbord/pages/products/product/product.component';
import { ProductsListComponent } from './dashbord/pages/products/products-list/products-list.component';

import { UsersComponent } from './dashbord/pages/users/users.component';
import { AddUserComponent } from './dashbord/pages/users/add-user/add-user.component';
import { UserComponent } from './dashbord/pages/users/user/user.component';
import { UsersListComponent } from './dashbord/pages/users/users-list/users-list.component';

import { OrdersComponent } from './dashbord/pages/orders/orders.component';
import { OrderComponent } from './dashbord/pages/orders/order/order.component';
import { OrdersListComponent } from './dashbord/pages/orders/orders-list/orders-list.component';

import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CustomFormsModule } from 'ng2-validation';
import { CartComponent } from './dashbord/pages/cart/cart.component';
import { AdminProfielComponent } from './dashbord/pages/admin-profiel/admin-profiel.component';


// for nice scroll
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    AuthComponent,
    SigninComponent,
    PagesComponent,
    SideMenuComponent,
    NavbarComponent,
    HomeComponent,
    CategoriesComponent,
    ProductsComponent,
    UsersComponent,
    OrdersComponent,
    AddCategoryComponent,
    CategoryComponent,
    AddUserComponent,
    UserComponent,
    OrderComponent,
    AddProductComponent,
    ProductComponent,
    ProductsListComponent,
    OrdersListComponent,
    CategoriesListComponent,
    UsersListComponent,
    CartComponent,
    AdminProfielComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PerfectScrollbarModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CustomFormsModule,
    FlashMessagesModule.forRoot(),
    CountoModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ],
  providers: [{
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
