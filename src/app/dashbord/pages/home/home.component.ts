import { AuthService } from './../../../services/auth.service';
import { OrdersService } from './../../../services/orders.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { CategoriesService } from '../../../services/categories.service';
import { UserModule } from './../../../modules/user.module';
import { ProductModule } from './../../../modules/product.module';
import { CategoryModule } from './../../../modules/category.module';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { UsersService } from '../../../services/users.service';
import { Subscription } from 'rxjs';
import { OrderModule } from 'src/app/modules/order.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  cateSubs: Subscription;
  produSub: Subscription;
  usersSub: Subscription;
  categories;
  caregory:  string;
  users:     UserModule[]     = [];
  products:  ProductModule[]  = [];
  product;
  filterdProducts: ProductModule[];
  orders: OrderModule[];
  ordersLength;
  LineChart = [];
  BarChart  = [];
  PieChart  = [];

  totalPosts;
  postsPerPage;
  currentPage;



  private authListenerSubs: Subscription;
  isAuth = false;

  constructor(
    private cateService:  CategoriesService,
    private proService:   ProductService,
    private usersService: UsersService,
    private route:        ActivatedRoute,
    private ordService:   OrdersService,
    private authService:  AuthService
  ) {

  }

  onAddToCart( product: ProductModule ) {
    console.log(product,  ' => onAddToCart');
    // this.ordService.addOrder(product);
  }

  onIncItem(productId) {
    console.log(productId, ' => onIncItem');
  }

  onDecItem(productId) {
    console.log(productId, ' => onDecItem');
  }


  ngOnInit() {

 // =========================================================================================
    // get categories to know lenght
    this.cateService.getAllCates(this.postsPerPage, this.currentPage);
    this.cateService.getAllCatesUpdatedListener()
    .subscribe((categoryData: {categories: CategoryModule[], cateCount: number}) => {
      // console.log(' => Add Categories ngOnInit =>', categoryData.categories);
      this.totalPosts = categoryData.cateCount;
      this.categories = categoryData.categories;

    });

    // // get All products in productsM
    this.proService.getAllProducts(this.postsPerPage, this.currentPage);
    this.produSub = this.proService.getAllProductsUpdatedListener()
    .subscribe( (productData: {products: ProductModule[], proCount: number} ) => {
      this.totalPosts = productData.proCount;
      this.filterdProducts   = this.products  = productData.products;
      this.route.queryParamMap
        .subscribe(
          (params: Params) => {
            this.caregory = params.get('caregory');
            // console.log('category =>', this.caregory,);
            this.filterdProducts = (this.caregory) ?
            this.products.filter(p => p.category === this.caregory) :
            this.products;
          });
    });


    this.ordService.getAllOrders();
    this.ordService.getAllOrdersUpdatedListener()
    .subscribe(
      orders => {
        // console.log(orders.length);
        this.orders = orders;
       }
    );

    this.usersService.getAllUsers(this.postsPerPage, this.currentPage);
    this.usersService.getAllUsersUpdatedListener()
    .subscribe((usersData: {users: UserModule[], usersCount: number}) => {
      this.users = usersData.users;
      // this.totalUsers = usersData.usersCount;
    });

 // ==================================== chart  =====================================================


         // Line chart:
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
       labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
       datasets: [{
           label: 'Number of Items Sold in Months',
           data: [9, 7, 3, 5, 2, 10, 15, 16, 19, 3, 1, 9],
           fill: false,
           lineTension: 0.2,
           borderColor: 'red',
           borderWidth: 1
       }]
      },
      options: {
       title: {
           text: 'Line Chart',
           display: true
       },
       scales: {
           yAxes: [{
               ticks: {
                   beginAtZero: true
                 }
             }]
         }
        }
        });

    // Bar chart:
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data: {
       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
       datasets: [{
           label: '# of Votes',
           data: [9, 7, 3, 5, 2, 10],
           backgroundColor: [
               'rgba(255, 99, 132, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)',
               'rgba(153, 102, 255, 0.2)',
               'rgba(255, 159, 64, 0.2)'
           ],
           borderColor: [
               'rgba(255,99,132,1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)',
               'rgba(153, 102, 255, 1)',
               'rgba(255, 159, 64, 1)'
           ],
           borderWidth: 1
       }]
      },
      options: {
       title: {
           text: 'Bar Chart',
           display: true
       },
       scales: {
           yAxes: [{
               ticks: {
                   beginAtZero: true
               }
           }]
       }
      }
      });

    // pie chart:
    this.PieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [9, 7, 3, 5, 2, 10],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      },
      options: {
          title: {
              text: 'Bar Chart',
              display: true
          },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
        }
      });

      this.isAuth = this.authService.getIsAuth();
      this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe( isAuthenticated => {
        console.log('isAuthenticated =>', isAuthenticated);
        this.isAuth = isAuthenticated;
      });
}





  ngOnDestroy() {
    // this.cateSubs.unsubscribe();
    // this.produSub.unsubscribe();
    // this.usersSub.unsubscribe();
    this.authListenerSubs.unsubscribe();

  }



}







