import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettier'
})
export class PrettierPipe implements PipeTransform {
  labelNames = new Map([
    ['time', 'Time'],
    ['temperature_2m', 'Temperature'],
    ['relative_humidity_2m', 'Relative Humidity'],
    ['rain', 'Rain'],
    ['surface_pressure', 'Surface Pressure'],
    ['cloud_cover', 'Cloud cover']
  ])

  transform(label: string, unitData: any) {
    const prettierLabelName = this.labelNames.get(label);
    const labelUnit = unitData[label];

    if (labelUnit === 'iso8601') {
      return `${prettierLabelName} [GMT]`;
    }

    return `${prettierLabelName} [${labelUnit}]`;
  }
}
