import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.scss'
})
export class AccountInfoComponent {
  isDropdownOpen = false;

  @Input() imageName!: string;
  @Input() userName!: string;
  @Input() userEmail!: string;

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}

  get imagePath() {
    return `../../../assets/avatars/${this.imageName}.png`;
  }

  logOutHandler() {
    this._authService.userLogOut();
    this.isDropdownOpen = false;
    window.location.reload();
    // this._router.navigate(['/']);
  }
}
