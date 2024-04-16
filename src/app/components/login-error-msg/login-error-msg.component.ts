import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login-error-msg',
  templateUrl: './login-error-msg.component.html',
  styleUrl: './login-error-msg.component.scss'
})
export class LoginErrorMsgComponent {
  @Output() closeButton = new EventEmitter();
}
