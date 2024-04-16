import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _location: Location
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._authService.loggedIn
      .pipe(map(val => {
        if (!val) {
          return true;
        }
        // this._location.back();
        this._router.navigate(['/forecast']);
        return false;
      })
      )
  }
}
