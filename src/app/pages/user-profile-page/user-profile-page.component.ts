import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.scss'
})
export class UserProfilePageComponent implements OnInit {
  userData: {
    avatarId: string, id: string, name: string, email: string
  } = { avatarId: '', id: '', name: '', email: '' };

  constructor(private _authService: AuthService) {}

  get imagePath() {
    return `../../../assets/avatars/${this.userData.avatarId}.png`;
  }

  ngOnInit(): void {
    const currentlyLoggedInUser = this._authService.loggedIn.getValue() as string;
    this._authService.getUserDetails(currentlyLoggedInUser)
      .subscribe(data => {
        this.userData.avatarId = data.avatarId;
        this.userData.id = data.id;
        this.userData.name = data.name;
        this.userData.email = data.email;
      });
  }

}
