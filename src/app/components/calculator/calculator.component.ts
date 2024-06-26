import { Component } from '@angular/core';
import SelectOptions from '../../models/select-options.model';
import { CalculatorService, createTemperatureValidator } from '../../services/calculator.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  temperatureValue = 0;
  humidityValue = 0;
  result = 0;
  resultReversed = 0;
  units = ['°C', '°F'];

  selectOptions: SelectOptions[] = [
    { label: 'Celsius [°C]', value: 0 },
    { label: 'Fahrenheit [°F]', value: 1 }
  ];
  selectValue = 0; // ---> two-way binding

  calculatorForm = new FormGroup({
    humidityControl: new FormControl(
      this.humidityValue,
      [Validators.required, Validators.min(0), Validators.max(100)]
    ),
    temperatureControl: new FormControl(
      this.temperatureValue,
      [Validators.required, createTemperatureValidator(this.selectValue)]
    ),
  });

  constructor(private _calcService: CalculatorService) {}

  get reversedUnit() {
    const index = this.selectValue === 0 ? 1 : 0;
    return this.units[index];
  }

  onFormSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (this.selectValue === 0) {
      // temp. is in celsius, we must convert it to fahrenheit
      const convertedTemp = this._calcService.celsiusToFahrenheit(this.temperatureValue);
      const resultInFahrenheit = this._calcService.calculateHeatIndex(convertedTemp, this.humidityValue);
      // result is in fahrenheit, we must convert it back to celsius
      this.result = this._calcService.fahrenheitToCelsius(resultInFahrenheit);
      this.resultReversed = resultInFahrenheit;
    }
    if (this.selectValue === 1) {
      // temp. is in fahrenheit
      const resultInFahrenheit = this._calcService.calculateHeatIndex(this.temperatureValue, this.humidityValue);
      this.result = resultInFahrenheit;
      this.resultReversed = this._calcService.fahrenheitToCelsius(resultInFahrenheit);
    }
    
    this._calcService.calculation.next([
      this.humidityValue,
      this.temperatureValue,
      this.units[this.selectValue],
      this.result,
      this.resultReversed,
      this.reversedUnit,
      this._calcService.currentTime()
    ]);
  }

  onSelectChange(val: number) {
    // setting new custom validator parameter
    const tempControl = this.calculatorForm.controls['temperatureControl'];
    tempControl.setValidators(
      [Validators.required, createTemperatureValidator(val)]
    );
    tempControl.updateValueAndValidity(); // checks validity
  }

  onHumidityInputChange(event: Event) {
    const el = event.target as HTMLInputElement;
    this.humidityValue = +el.value;
    this.result = 0;
    this.resultReversed = 0;
  }

  onTemperatureInputChange(event: Event) {
    const el = event.target as HTMLInputElement;
    this.temperatureValue = +el.value;
    this.result = 0;
    this.resultReversed = 0;
  }
}
