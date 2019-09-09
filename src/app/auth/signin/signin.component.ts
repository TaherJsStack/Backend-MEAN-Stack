import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  errMsg: string;
  errSub: Subscription;

  constructor(private authService: AuthService ) { }

  ngOnInit() {
  }

  onSignin(auth: NgForm) {
    if (!auth) {
      return;
    }
    const authSignin = {
      authEmail:    auth.value.authEmail,
      authPassword: auth.value.authPassword,
    };
    console.log(auth, ' => auth');
    this.authService.login(authSignin);
    this.errSub = this.authService.getErrMsg()
    .subscribe( err =>
      { console.log('err=>', err);
      this.errMsg = err;
     });

  }

  ngOnDestroy() {
    this.errSub.unsubscribe();
  }

}
