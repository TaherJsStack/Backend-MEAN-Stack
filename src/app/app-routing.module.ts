import { AdminProfielComponent } from './dashbord/pages/admin-profiel/admin-profiel.component';
import { UserComponent } from './dashbord/pages/users/user/user.component';
import { UsersListComponent } from './dashbord/pages/users/users-list/users-list.component';
import { AddUserComponent } from './dashbord/pages/users/add-user/add-user.component';
import { ProductComponent } from './dashbord/pages/products/product/product.component';
import { ProductsListComponent } from './dashbord/pages/products/products-list/products-list.component';
import { AddProductComponent } from './dashbord/pages/products/add-product/add-product.component';
import { OrderComponent } from './dashbord/pages/orders/order/order.component';
import { OrdersListComponent } from './dashbord/pages/orders/orders-list/orders-list.component';
import { CategoriesListComponent } from './dashbord/pages/categories/categories-list/categories-list.component';
import { CategoryComponent } from './dashbord/pages/categories/category/category.component';
import { AddCategoryComponent } from './dashbord/pages/categories/add-category/add-category.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SideMenuComponent } from './dashbord/side-menu/side-menu.component';
import { PagesComponent } from './dashbord/pages/pages.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { CategoriesComponent } from './dashbord/pages/categories/categories.component';
import { HomeComponent } from './dashbord/pages/home/home.component';
import { OrdersComponent } from './dashbord/pages/orders/orders.component';
import { ProductsComponent } from './dashbord/pages/products/products.component';
import { UsersComponent } from './dashbord/pages/users/users.component';
import { AuthGuard } from './services/auth.guard';
import { SigninComponent } from './auth/signin/signin.component';


const routes: Routes = [
  { path: '', component: AuthComponent, children: [
    { path: '', component: SigninComponent },
  ]},
  // { path: '', component: DashbordComponent, children: [
  { path: 'dashbord', component: DashbordComponent, canActivate: [AuthGuard]  , children: [  // canActivate: [AuthGuard]  ,
    // { path: '',         component: HomeComponent }, // for test
    { path: 'sideMenu', component: SideMenuComponent },
    { path: 'pages',    component: PagesComponent, children: [
      { path: 'home',       component: HomeComponent },
      { path: 'categories', component: CategoriesComponent, children: [
        { path: 'addcategory',       component: AddCategoryComponent },
        { path: 'categorieslist',    component: CategoriesListComponent },
        { path: 'category/:id/info', component: CategoryComponent},
        { path: 'editCategory/:id/edit', component: AddCategoryComponent}
      ]},
      { path: 'orders',     component: OrdersComponent, children: [
        { path: 'orderslist',     component: OrdersListComponent },
        { path: 'order/:id/info', component: OrderComponent }
      ]},
      { path: 'products',   component: ProductsComponent, children: [
        { path: 'addproduct',        component: AddProductComponent },
        { path: 'productslist',      component: ProductsListComponent },
        { path: 'product/:id/info',  component: ProductComponent },
        { path: 'editProduct/:id/edit',  component: AddProductComponent }
      ]},
      { path: 'users',      component: UsersComponent, children: [
        { path: 'adduser',       component: AddUserComponent },
        { path: 'userslist',     component: UsersListComponent },
        { path: 'user/:id/info', component: UserComponent  },
        { path: 'edituser/:id/edit', component: AddUserComponent  }
      ]},
      { path: 'profile', component: AdminProfielComponent  }
    ]}
  ]},
  { path: '**', redirectTo: 'dashbord' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard ]
})
export class AppRoutingModule { }
