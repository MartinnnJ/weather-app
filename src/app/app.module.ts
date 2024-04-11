import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ChartModule } from 'primeng/chart';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForecastPageComponent } from './pages/forecast-page/forecast-page.component';
import { ChartPageComponent } from './pages/chart-page/chart-page.component';
import { HeatIndexPageComponent } from './pages/heat-index-page/heat-index-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LastHourDirective } from './directives/last-hour.directive';
import { NowDirective } from './directives/now.directive';
import { PrettierPipe } from './pipes/prettier.pipe';
import { ForecastTableComponent } from './components/forecast-table/forecast-table.component';
import { ForecastSelectComponent } from './components/forecast-select/forecast-select.component';
import { ForecastPaginatorComponent } from './components/forecast-paginator/forecast-paginator.component';
import { ForecastChartComponent } from './components/forecast-chart/forecast-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ForecastPageComponent,
    ChartPageComponent,
    HeatIndexPageComponent,
    NavigationComponent,
    NotFoundPageComponent,
    LoginPageComponent,
    LastHourDirective,
    NowDirective,
    PrettierPipe,
    ForecastTableComponent,
    ForecastSelectComponent,
    ForecastPaginatorComponent,
    ForecastChartComponent,
  ],
  imports: [
    BrowserModule,
    ChartModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
