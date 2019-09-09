// import { AuthModule } from './../auth/auth.module';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserModule } from './../modules/user.module';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const BACKEND_API = environment.API_URL + '/users/';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // AuthModule: AuthModule[];
  users:      UserModule[];
  usersUpdated = new Subject<{users: UserModule[], usersCount: number}>();

  constructor( private  http: HttpClient) { }

  // get All Users
  getAllUsers(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, users: any; maxPosts: number }>(
      BACKEND_API + queryParams
      )
    .pipe(
      map( userData => {
          return{ users: userData.users.map( (user) => {
            return {
              id:        user._id,
              name: {
                firstname: user.name.firstname,
                lastname:  user.name.lastname,
              },
              address: {
                country: user.address.country,
                street:  user.address.street,
                zip:     user.address.zip,
                city:    user.address.city
              },
              email:     user.email,
              password:  user.password,
              phone:     user.phone,
              ginder:    user.ginder,
              photoURL:  user.photoURL,
              blockUser: user.blockUser,
              roll:      user.roll,
              date:      user.date,
              created_at: user.created_at,
              orders:    user.orders,
            };
          }),
          maxPost: userData.maxPosts
        };
      })
      )
      .subscribe( transformedUsersData => {
        this.users = transformedUsersData.users;
        this.usersUpdated.next({
          users: [...this.users],
          usersCount: transformedUsersData.maxPost
        });
        // console.log(transformedUsersData);
      });
  }

  getAllUsersUpdatedListener() {
  }

  // get only one user
  getUser(userId: string) {
  }

  // make user blocked
  blockUser(userId: string, block) { }


  // add and save new  user
  addUser( userData: UserModule ) { }

  // save updates to DB
  updateUser(userId: string, updateUserData) { }

  // save updates to DB
  updateUserRoll(userId: string, updateUserRoll) { }

  // delet user by id
  deleteUser(userId: string)  {
    return this.http.delete<{message: string}>(
      BACKEND_API + userId
      );
  }


    // delet user by id
    getDBUser(userId: string)  { }

}
