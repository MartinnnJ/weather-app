import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.scss'
})
export class ErrorMsgComponent {
  @Input() name!: string;
  @Input() msg!: string;
}
