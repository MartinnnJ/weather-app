import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  constructor(private _location: Location) {}

  onFormSubmit(
    event: SubmitEvent,
    emailRef: HTMLInputElement,
    passwordRef: HTMLInputElement
  ) {
    event.preventDefault();
    console.log(emailRef.value, passwordRef.value);
  }

  onNavigateBack() {
    this._location.back();
  }
}
