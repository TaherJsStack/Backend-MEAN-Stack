import { UsersService } from './../../../../services/users.service';
import { UserModule } from './../../../../modules/user.module';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { PageEvent } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {


  users: UserModule[] = [];
  userSub: Subscription;

  totalUsers = 0;
  usersPerPage = 7;
  usersCurrentPage = 1;
  usersPageSizeOptions = [1, 7, 14, 20];

  constructor( private usersService: UsersService,
              private _flashMessagesService: FlashMessagesService ) { }

  ngOnInit() {

    this.usersService.getAllUsers(this.usersPerPage, this.usersCurrentPage);
    this.userSub = this.usersService.getAllUsersUpdatedListener()
      .subscribe( (usersData: {users: UserModule[], usersCount: number}) => {
          this.users = usersData.users;
          this.totalUsers = usersData.usersCount;
        }
      );
  }

  onChangedPage(pageData: PageEvent) {
    console.log('pageData', pageData);
    this.usersCurrentPage =  pageData.pageIndex + 1;
    this.usersPerPage =      pageData.pageSize;
    this.usersService.getAllUsers(this.usersPerPage, this.usersCurrentPage);
  }

  onRollChange() {

  }

  onBlockUser(userId, userName,  event) {
    const user = {
      id: userId,
      blockUser: event.checked,
    };

    if (confirm('Are you sure you want to block ' + userName + ' ?') ) {
      this.usersService.blockUser(userId, user)
      .subscribe( 
        msg => {
        this.usersService.getAllUsers(this.usersPerPage, this.usersCurrentPage);
        this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
      },
      err => {
        console.log('err.error=>', err.error.message);
        this._flashMessagesService.show( err.error.message , { cssClass: 'alert-danger flash-message', timeout: 8000 });
      });
   }
  }


  onDeleteUser(id: string, categoryName: string) {
    if (confirm('Are you sure you want to delete ' + categoryName + id + '?') ) {
      console.log(categoryName + id , ' Deleted Done...');
      this.usersService.deleteUser(id)
      .subscribe( msg => {
        this.usersService.getAllUsers(this.usersPerPage, this.usersCurrentPage);
        this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });

      });
   }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
