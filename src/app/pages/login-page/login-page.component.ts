import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  onFormSubmit(
    event: SubmitEvent,
    emailRef: HTMLInputElement,
    passwordRef: HTMLInputElement
  ) {
    event.preventDefault();
    console.log(emailRef.value, passwordRef.value);
  }
}
