import { UserModule } from './../../../../modules/user.module';
import { UsersService } from './../../../../services/users.service';
import { ActivatedRoute, Params, Router, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: UserModule;
  usersPerPage;
  usersCurrentPage;


  constructor( private route: ActivatedRoute,
              private usersService: UsersService,
              private router: Router,
              private _flashMessagesService: FlashMessagesService,
              ) { }

  ngOnInit() {

    this.route.paramMap
    .subscribe( (paramMap: ParamMap ) => {
        if ( paramMap.has('id') ) {
          const userID   = paramMap.get('id');
          this.user =  this.usersService.getUser(userID);
        } else {
          this.user   = null;
          this.router.navigate(['/dashbord/pages/users/userslist']);
        }
      });
  }


  onDeleteuser(id: string, categoryName: string) {
    if (confirm('Are you sure you want to delete ' + categoryName + id + '?') ) {
      console.log(categoryName + id , ' Deleted Done...');
      this.usersService.deleteUser(id)
      .subscribe( msg => {
        this.router.navigate(['/dashbord/pages/users/userslist']);
        this._flashMessagesService.show( msg.message , { cssClass: 'alert-success flash-message', timeout: 3000 });
      });
   }
  }



}
