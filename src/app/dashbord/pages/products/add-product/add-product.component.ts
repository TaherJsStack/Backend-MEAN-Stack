// import { NgForm } from '@angular/forms';
import { UsersService } from './../../../../services/users.service';
import { CategoriesService } from './../../../../services/categories.service';
import { UserModule } from './../../../../modules/user.module';
import { CategoryModule } from './../../../../modules/category.module';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductModule } from '../../../../modules/product.module';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute, ParamMap } from '../../../../../../node_modules/@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { mimeType } from './mime-type.validator';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

  // @ViewChild('product') productFormAdd: NgForm;

  categoriesM:    CategoryModule[] = [];
  productsM:      ProductModule[]  = [];
  usersM:         UserModule[]     = [];

  productsSub:    Subscription;
  cateSubs:       Subscription;
  userSub:        Subscription;

  activeProduct:  Boolean = false;
  checked:        Boolean = true;
  editMode:       Boolean = false;
  pro:            ProductModule;
  proID;
  craetorName;
  imgReview: string;
  imageFile;
  productFormAdd: FormGroup;

  // for categories paginator
  catsPerPage;
  catsCurrentPage;

  // for categories paginator
  usersPerPage;
  usersCurrentPage;

  totalProducts = 0;
  proPerPage = 2;
  proCurrentPage = 1;
  proPageSizeOptions = [1, 2, 5, 10];

  showProduct = true;

  constructor(private proService:   ProductService ,
              private cateService:  CategoriesService,
              private usersService: UsersService,
              private route:        ActivatedRoute,
              private _flashMessagesService: FlashMessagesService) {  }

  ngOnInit() {
    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
        if ( paramMap.has('id') ) {
          this.editMode  = true;
          this.proID     = paramMap.get('id');
          this.pro       =  this.proService.getPro(this.proID);
          this.imgReview = this.pro.image;
          if ( this.pro.showProduct === 'true') {
            this.showProduct = true;
          }
        } else {
          this.editMode = false;
          this.proID    = null;
        }
      });



    // get All Users from services
    this.usersService.getAllUsers(this.usersPerPage, this.usersCurrentPage);
    this.userSub = this.usersService.getAllUsersUpdatedListener()
      .subscribe( (usersData: {users: UserModule[], usersCount: number}) => {
        this.usersM = usersData.users;
      });

    // get All categories from categories services
    this.cateService.getAllCates(this.catsPerPage, this.catsCurrentPage);
    this.cateSubs = this.cateService.getAllCatesUpdatedListener()
    .subscribe( (categoryData: {categories: CategoryModule[], cateCount: number}) => {
      this.categoriesM = categoryData.categories;
    });


    this.proService.getAllProducts(this.proPerPage, this.proCurrentPage);
    this.productsSub = this.proService.getAllProductsUpdatedListener()
    .subscribe( (productData: {products: ProductModule[], proCount: number} )=> {
        this.totalProducts = productData.proCount;
        this.productsM     = productData.products;
      });

       // Some Damn Comments here
       this.productFormAdd = new FormGroup({
        name:        new FormControl(null, Validators.required),
        price:       new FormControl(null, Validators.required),
        discount:    new FormControl(null, Validators.required),
        image:       new FormControl(null,
          {validators: [
            Validators.required],
            asyncValidators: [mimeType]}),
        description: new FormControl(null, Validators.required),
        quantity:    new FormControl(null, Validators.required),
        category:    new FormControl(null, Validators.required),
      });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.productFormAdd.patchValue({image: file});
    this.productFormAdd.get('image').updateValueAndValidity();
    // console.log(file);
    // console.log(this.productFormAdd);
    // to create prview
    const reader = new FileReader();
    reader.onload = () => {
      this.imgReview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onChangedPage(pageData: PageEvent) {
    console.log('pageData', pageData);
    this.proCurrentPage =   pageData.pageIndex + 1;
    this.proPerPage =       pageData.pageSize;
    this.proService.getAllProducts(this.proPerPage, this.proCurrentPage);
  }

  // show product or hide
  changed(event) {
    this.showProduct = event.checked;
  }

  onSaveProduct() {
    if (this.productFormAdd.invalid ) {
      return;
    }
    const priceAfterDis = this.productFormAdd.value.price - this.productFormAdd.value.discount;
      const productData = new FormData();
        productData.append('id',          null);
        productData.append('name',        this.productFormAdd.value.name);
        productData.append('price',       this.productFormAdd.value.price);
        productData.append('discount',    this.productFormAdd.value.discount);
        productData.append('priceDisc',   priceAfterDis.toString());
        productData.append('image',       this.productFormAdd.value.image);
        productData.append('description', this.productFormAdd.value.description);
        productData.append('category',    this.productFormAdd.value.category);
        productData.append('quantity',    this.productFormAdd.value.toString());
        productData.append('showProduct', this.showProduct.toString());
        productData.append('creatorId',   'craetor id');
        productData.append('creatorName', 'craetor Name');
        productData.append('addedDate',   new Date().toString());
        productData.append('clientItems', '1');
        productData.append('status',      'true');
      // console.log('this.productFormAdd =>', productData);
    if (this.editMode) {


      const productDataU = new FormData();

        productDataU.append('id',          null);
        productDataU.append('name',        this.productFormAdd.value.name);
        productDataU.append('price',       this.productFormAdd.value.price);
        productDataU.append('discount',    this.productFormAdd.value.discount);
        productDataU.append('priceDisc',   priceAfterDis.toString());
        productDataU.append('image',       this.productFormAdd.value.image);
        productDataU.append('description', this.productFormAdd.value.description);
        productDataU.append('category',    this.productFormAdd.value.category);
        productDataU.append('quantity',    this.productFormAdd.value.quantity.toString());
        productDataU.append('showProduct', this.showProduct.toString());
        productDataU.append('creatorId',   'craetor id');
        productDataU.append('creatorName', 'craetor Name');
        productDataU.append('addedDate',   new Date().toString());
        productDataU.append('clientItems', '1');
        productDataU.append('status',      'true');

      console.log('productData editMode=>', productDataU);
      this.proService.updatePro(this.proID, productData)
      .subscribe(
        msg => {
          this.proService.getAllProducts(this.proPerPage, this.proCurrentPage);
          this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
        },
        err => {
          console.log('err.error=>', err.error.message);
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });
    } else {
      console.log('productData addMode=>', productData);

      this.proService.addPro(productData)
        .subscribe(
          msg => {
          this.proService.getAllProducts(this.proPerPage, this.proCurrentPage);
          this._flashMessagesService.show( msg.message  ,{ cssClass: 'alert-success flash-message', timeout: 3000 });
          },
        err => {
          console.log('err.error=>', err.error.message);
          this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
        });
    }
    this.editMode = false;
    this.productFormAdd.reset();
    this.imgReview = null;
  }

  onEdit(productId: string) {
    console.log(productId, ' => onEditi::::::::::');
    if ( productId ) {
      this.editMode  = true;
      this.proID     = productId;
      this.pro       =  this.proService.getPro(this.proID);
      this.imgReview = this.pro.image;
      if (this.pro.showProduct === 'true') {
        this.showProduct = true;
      }
      console.log(this.pro, ' => category.....');
    } else {
      this.editMode = false;
      this.proID   = null;
    }
  }

  onDeletePro(id: string, productName: string) {
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
    this.cateSubs.unsubscribe();
    this.userSub.unsubscribe();
   }




  }






