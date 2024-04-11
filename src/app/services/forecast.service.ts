import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private _baseUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private _http: HttpClient) {}

  fetchForecastData() {
    const weatherVariables = ["temperature_2m", "relative_humidity_2m", "rain", "surface_pressure", "cloud_cover"];

    let params = new HttpParams()
      .append('latitude', 52.52)
      .append('longitude', 13.41)
      .append('past_days', 7)

      for (const item of weatherVariables) {
        params = params.append('hourly', item);
      }
    
    const options = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' }),
      params,
    };

    return this._http.get(`${this._baseUrl}`, options)
      .pipe(
        map((responseData: any) => {
          const hourlyForecastData = responseData['hourly'];
          const temp = [];

          for (const key in hourlyForecastData) {
            temp.push([key, ...hourlyForecastData[key]])
          }

          return {
            units: responseData['hourly_units'],
            data: temp,
          };
        })
      )
  }
}
