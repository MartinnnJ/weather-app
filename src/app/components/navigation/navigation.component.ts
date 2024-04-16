import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  userLoggedIn = false;
  userData: {
    avatarId: string, email: string, name: string
  } = { avatarId: '', email: '', name: '' };

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.loggedIn
      .subscribe(val => {
        if (val) {
          this.userLoggedIn = true;
          this._authService.getUserDetails(val)
            .subscribe(user => this.userData = user);
        } else {
          this.userLoggedIn = false;
          this.userData = { avatarId: '', email: '', name: '' };
        }
      });
  }
}
