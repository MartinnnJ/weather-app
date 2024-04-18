import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastPageComponent } from './pages/forecast-page/forecast-page.component';
import { ChartPageComponent } from './pages/chart-page/chart-page.component';
import { HeatIndexPageComponent } from './pages/heat-index-page/heat-index-page.component';
import { NotFoundPageComponent } from '@pages/not-found-page/not-found-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserProfilePageComponent } from '@pages/user-profile-page/user-profile-page.component';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/forecast', pathMatch: 'full' },
  { path: 'forecast', component: ForecastPageComponent },
  { path: 'chart', component: ChartPageComponent },
  { path: 'calculator', canActivate: [AuthGuardService], component: HeatIndexPageComponent },
  { path: 'profile', canActivate: [AuthGuardService], component: UserProfilePageComponent },
  { path: 'login', canActivate: [LoginGuardService], component: LoginPageComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
