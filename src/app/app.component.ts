import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.isUserLoggedIn();
  }
  
}
