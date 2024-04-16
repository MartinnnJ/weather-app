import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

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
import { CalculatorComponent } from './components/calculator/calculator.component';
import { HistoryTableComponent } from './components/history-table/history-table.component';
import { LoadingMsgComponent } from './components/loading-msg/loading-msg.component';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { LoginErrorMsgComponent } from './components/login-error-msg/login-error-msg.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

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
    CalculatorComponent,
    HistoryTableComponent,
    LoadingMsgComponent,
    ErrorMsgComponent,
    AccountInfoComponent,
    LoginErrorMsgComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    ChartModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
