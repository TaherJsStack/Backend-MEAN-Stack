import { UserModule } from './../../modules/user.module';
import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit, OnDestroy {


  private authListenerSubs: Subscription;
  isAuth = false;
  user: UserModule;
  userSub: Subscription;
  constructor( private authService: AuthService, private userService: UsersService) {
                  const token = localStorage.getItem('token');
                  console.log(token);
                  const userId = localStorage.getItem('userId');

                  this.userService.getDBUser(userId)
                  .subscribe( userData => {
                    console.log('userData =>', userData);
                    this.user = userData.userData;
                    // this.userInfo.next(userData.userData);
                  });
  }

  ngOnInit() {
    this.isAuth = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
                            .getAuthStatusListener()
                            .subscribe( isAuthenticated => {
                                console.log('isAuthenticated =>', isAuthenticated);
                                this.isAuth = isAuthenticated;
                              });
    // this.userSub = this.authService.getUserInfoListener()
    // .subscribe(userRes => {
    //   console.log('userRes =>', userRes);
    //   this.user = userRes;
    // });


  }

  onLogout() {
    this.authService.logout();
  }


  ngOnDestroy() {
    // this.userSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }

}
