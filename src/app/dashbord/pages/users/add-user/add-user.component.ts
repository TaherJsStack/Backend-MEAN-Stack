import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsersService } from './../../../../services/users.service';
import { UserModule } from './../../../../modules/user.module';
import { NgForm } from '../../../../../../node_modules/@angular/forms';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { PageEvent } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as data from './countriesData';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @ViewChild('user') userForm: NgForm;

  minDate =      new Date(2019, 1, 1);
  maxDate =      new Date(2020, 1, 1);
  users:         UserModule[] = [];
  loadUser:      UserModule;
  userSub:       Subscription;
  editMode:      Boolean = false;
  userID;
  allCountries: any;

  totalUsers = 0;
  usersPerPage = 5;
  usersCurrentPage = 1;
  usersPageSizeOptions = [1, 2, 5, 10];

  blockUser = false;

  constructor( private usersService: UsersService,
               private http: HttpClient,
               private route: ActivatedRoute,
               private _flashMessagesService: FlashMessagesService,
              ) { }

  ngOnInit() {

    // console.log('D=> ', data.default);
    this.allCountries = data.default;

    this.route.paramMap
      .subscribe( (paramMap: ParamMap ) => {
        if ( paramMap.has('id') ) {
          this.editMode = true;
          this.userID   = paramMap.get('id');
          // console.log(this.userID);
          this.loadUser =  this.usersService.getUser(this.userID);
          this.blockUser = this.loadUser.blockUser;
          // console.log(this.loadUser, ' => user.....');
        } else {
          this.editMode = false;
          this.userID   = null;
        }
      });

    this.usersService.getAllUsers(this.usersPerPage, this.usersCurrentPage);
    this.userSub = this.usersService.getAllUsersUpdatedListener()
      .subscribe( (usersData: {users: UserModule[], usersCount: number}) => {
        this.users = usersData.users;
        this.totalUsers = usersData.usersCount;
      });

  } // end ngOnInIt

  onChangedPage(pageData: PageEvent) {
    console.log('pageData', pageData);
    this.usersCurrentPage =  pageData.pageIndex + 1;
    this.usersPerPage =      pageData.pageSize;
    this.usersService.getAllUsers(this.usersPerPage, this.usersCurrentPage);
  }

  onBlockUser(event) {
    console.log('event checked =>', event.checked);
    this.blockUser = event.checked;
  }

  onSaveUser(user: NgForm) {
    console.log('user value =>', user.value);
    if (user.invalid) { return; }
    const pass1 = user.value.userPassword;
    const pass2 = user.value.userConfig;
    if ( pass1 === pass2 ) {
      if ( this.editMode ) {
          // console.log(newUserData);
          const updateUserData = {
            id:        this.userID,
            name:      {
              firstname: user.value.name.firstname,
              lastname:  user.value.name.lastname,
            },
            address: {
              country: user.value.address.country,
              street:  user.value.address.street,
              zip:     user.value.address.zip,
              city:    user.value.address.city
            },
            email:     user.value.userEmail,
            phone:     user.value.userPhone,
            ginder:    user.value.userGinder,
            blockUser: this.blockUser,
            roll:      'user',
            date:      user.value.userDate,
            created_at: new Date(),
            orders:    [],
            photoURL:  'https://st-listas.20minutos.es/images/2014-06/383064/4461159_249px.jpg?1403287587',
          };
          this.usersService.updateUser(this.userID, updateUserData)
          .subscribe( msg => {
            this.usersService.getAllUsers(this.usersPerPage, this.usersCurrentPage);
            this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 6000 });

          });
      } else {
        const newUser = {
          id:        null,
          name:      {
            firstname: user.value.name.firstname,
            lastname:  user.value.name.lastname,
          },
          address: {
            country: user.value.address.country,
            street:  user.value.address.street,
            zip:     user.value.address.zip,
            city:    user.value.address.city
          },
          email:     user.value.userEmail,
          password:  user.value.userPassword,
          phone:     user.value.userPhone,
          ginder:    user.value.userGinder,
          blockUser: this.blockUser,
          roll:      'user',
          date:      user.value.userDate,
          created_at: new Date(),
          orders:    [],
          photoURL:  'https://st-listas.20minutos.es/images/2014-06/383064/4461159_249px.jpg?1403287587',
        };
          console.log('new User =>', newUser);
          this.usersService.addUser(newUser)
          .subscribe( msg => {
            this.usersService.getAllUsers(this.usersPerPage, this.usersCurrentPage);
            this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
          }, err => {
            // console.log('err =>', err);
            this._flashMessagesService.show( err.error.error , { cssClass: 'alert-danger flash-message', timeout: 7000 });
          });
      }
    } else {
      this._flashMessagesService.show('password doesn\'t match ', { cssClass: 'alert-danger flash-message', timeout: 6000 });
    }
    user.resetForm();
    this.editMode = false;
  }

  onEditUser(id: string) {
    console.log(id, ' => onEditi::::::::::');
    this.userID = id;
      if ( this.userID ) {
        this.editMode = true;
        // console.log(this.userID);
        this.loadUser =  this.usersService.getUser(this.userID);
        this.blockUser = this.loadUser.blockUser;
        // console.log(this.loadUser, ' => user.....');
      } else {
        this.editMode = false;
        this.userID   = null;
      }

  }

  onDeleteUser(id: string, userName: string) {
    if (confirm('Are you sure you want to delete ' + userName + id + '?') ) {
      // console.log(userName + id , ' Deleted Done...');
      this.usersService.deleteUser(id).subscribe( msg => {
        this.usersService.getAllUsers(this.usersPerPage, this.usersCurrentPage);
        this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
      });
   }
  }


}
