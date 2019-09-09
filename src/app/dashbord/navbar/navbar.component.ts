import { AuthService } from './../../services/auth.service';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  href: string;

  constructor(private router: Router,
              private location: Location,
              private titleService: Title,
              private userService: UsersService,
              private authService: AuthService) { }

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);

  }


  onLogout() {
    console.log('Auth logout............');
    this.authService.logout();
  }


}
