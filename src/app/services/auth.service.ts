import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl = 'http://127.0.0.1:3000';

  loggedIn = new BehaviorSubject<string | false>(false);
  loggingInError = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient) {}

  isUserLoggedIn() {
    const session = localStorage.getItem('session');
    if (session) {
      this.loggedIn.next(session);
    }
  }

  userLogIn(enteredEmail: string, enteredPassword: string) {
    this.getUsers().subscribe(users => {
      const userFound = users.find(user => {
        return (
          user.email === enteredEmail &&
          user.password === enteredPassword
        )
      });
      this.userAuthentication(userFound);
    }, error => {
      this.loggingInError.next(true);
    })
  }

  userLogOut() {
    this.loggedIn.next(false);
    localStorage.removeItem('session');
  }

  private userAuthentication(user: User | undefined) {
    let timerId: any;
    const promise = new Promise(resolve => {
      timerId = setTimeout(() => {
        if (user) {
          this.loggedIn.next(user.id);
          this.loggingInError.next(false);
          localStorage.setItem('session', user.id);
        } else {
          this.loggedIn.next(false);
          this.loggingInError.next(true);
        }
        resolve('Done!');
      }, 2000);
    });
    promise.then(() => clearTimeout(timerId));
  }

  getUserDetails(userId: string) {
    return this._http.get<User>(`${this._baseUrl}/users/${userId}`);
  }

  private getUsers() {
    return this._http.get<User[]>(`${this._baseUrl}/users`);
  }
}
