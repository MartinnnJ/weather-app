import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import Location from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private _baseUrl = 'https://api.open-meteo.com/v1/forecast';
  private _locations: Location[] = [
    { name: 'London', latitude: 51.5085, longitude: -0.1257 },
    { name: 'Bratislava', latitude: 48.1482, longitude: 17.1067 },
    { name: 'St. Ľubovňa', latitude: 49.2986, longitude: 20.6862 },
    { name: 'Antalya', latitude: 36.9081, longitude: 30.6956 },
  ];
  selectedLocation: Location = this._locations[0]; // ---> change default forecast location here

  constructor(private _http: HttpClient) {}

  fetchForecastData() {
    const weatherVariables = ["temperature_2m", "relative_humidity_2m", "rain", "surface_pressure", "cloud_cover"];

    let params = new HttpParams()
      .append('latitude', this.selectedLocation.latitude)
      .append('longitude', this.selectedLocation.longitude)
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
