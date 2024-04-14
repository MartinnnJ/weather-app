import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs';

// custom validator ---> returns validator fn that returns true (error), or null (no error)
export function createTemperatureValidator(selectedUnit: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const enteredTemperature = control.value;
    const limits = new Map([
      [0, 26.7],
      [1, 80]
    ]);

    if (selectedUnit === 0) {
      const celsiusLimit = limits.get(0)!;
      if (celsiusLimit > enteredTemperature) {
        return { isTemperatureInvalid: true };
      }
      return null;
    }

    const fahrenheitLimit = limits.get(1)!;
    if (fahrenheitLimit > enteredTemperature) {
      return { isTemperatureInvalid: true }; // ---> 'isTemperatureInvalid' is error name
    }
    return null;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  calculation = new Subject<(string | number)[]>();

  // https://www.calculator.net/heat-index-calculator.html
  calculateHeatIndex(fahrenheit: number, humidity: number) {
    const heatIndex = -42.379 + 2.04901523 * fahrenheit + 10.14333127 * humidity
      - 0.22475541 * fahrenheit * humidity - 6.83783e-03 * fahrenheit * fahrenheit
      - 5.481717e-02 * humidity * humidity + 1.22874e-03 * fahrenheit * fahrenheit * humidity
      + 8.5282e-04 * fahrenheit * humidity * humidity - 1.99e-06 * fahrenheit * fahrenheit * humidity * humidity;
  
    return +heatIndex.toFixed(2); // returns fahrenheit !
  }

  celsiusToFahrenheit(celsius: number) {
    const fahrenheit = (celsius * 9/5) + 32;
    return +fahrenheit.toFixed(2);
  }

  fahrenheitToCelsius(fahrenheit: number) {
    const celsius = (fahrenheit - 32) * 5/9;
    return +celsius.toFixed(2);
  }

  currentTime() {
    const currentDate = new Date();
  
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
  
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  saveInLocalStorage(rowArr: (number | string)[]) {
    const temp = [];
    const storedData = localStorage.getItem('heat-index') as string;
    if (storedData) {
      const storedDataParsed = JSON.parse(storedData);
      temp.push(...storedDataParsed);
    }
    temp.unshift(rowArr);
    if (temp.length > 5) temp.pop();
    localStorage.setItem('heat-index', JSON.stringify(temp));

    return JSON.parse(localStorage.getItem('heat-index') as string);
  }
  
  readFromLocalStorage() {
    const storedData = localStorage.getItem('heat-index') as string;
    if (storedData) {
      return JSON.parse(storedData);
    }
    return [];
  }

  clearLocalStorage() {
    localStorage.removeItem('heat-index');
  }
}
