import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit, OnDestroy {
  isLoggingIn = false;
  loginError!: boolean;

  loggingInErrorSubs!: Subscription;
  loggedInSubs!: Subscription;

  constructor(
    private _location: Location,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggingInErrorSubs = this._authService.loggingInError
      .subscribe(bool => {
        this.loginError = bool;
        this.isLoggingIn = false;
      });

    this.loggedInSubs = this._authService.loggedIn
      .subscribe(val => {
        if (val) {
          this._location.back();
        }
      });
  }

  ngOnDestroy(): void {
    this.loggingInErrorSubs.unsubscribe();
    this.loggedInSubs.unsubscribe();
  }

  onFormSubmit(
    event: SubmitEvent,
    emailRef: HTMLInputElement,
    passwordRef: HTMLInputElement
  ) {
    event.preventDefault();
    const email = emailRef.value;
    const password = passwordRef.value;

    if (email.length > 2 && password.length > 2) {
      this._authService.userLogIn(email, password);
      this.loginError = false;
      this.isLoggingIn = true;
    } else {
      this.loginError = true;
      this.isLoggingIn = false;
    }
  }

  onNavigateBack() {
    this._location.back();
  }
}
