import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastPageComponent } from './pages/forecast-page/forecast-page.component';
import { ChartPageComponent } from './pages/chart-page/chart-page.component';
import { HeatIndexPageComponent } from './pages/heat-index-page/heat-index-page.component';
import { NotFoundPageComponent } from '@pages/not-found-page/not-found-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/forecast', pathMatch: 'full' },
  { path: 'forecast', component: ForecastPageComponent },
  { path: 'chart', component: ChartPageComponent },
  { path: 'calculator', component: HeatIndexPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
