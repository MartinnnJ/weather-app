import { Component, OnInit } from '@angular/core';
import SelectOptions from '../../models/select-options.model';
import { ForecastService } from '../../services/forecast.service';
import { PrettierPipe } from '../../pipes/prettier.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-forecast-chart',
  templateUrl: './forecast-chart.component.html',
  styleUrl: './forecast-chart.component.scss',
  providers: [PrettierPipe, DatePipe]
})
export class ForecastChartComponent implements OnInit {
  xAxeData: string[] = [];
  yAxeData: number[][] = [];

  filterSelectOptions: SelectOptions[] = [
    { label: 'For past 7 days', value: 0 },
    { label: 'For upcoming 7 days', value: 1 }
  ];
  filterSelectValue = 1; // ---> two-way binding

  datasetSelectOptions: SelectOptions[] = [];
  datasetSelectValue = 0; // ---> two-way binding

  get filteredData() {
    const currentDate = new Date().toISOString().split('T')[0];
    const index = this.xAxeData.findIndex(arr => arr.split('T')[0] === currentDate);

    const dataLength = this.xAxeData.length;

    if (this.filterSelectValue === 0) {
      const filteredXData = this.xAxeData.slice(0, index);
      const filteredYData = this.yAxeData.map(arr => {
        return arr.slice(0, index);
      });
      return { filteredXData, filteredYData };
    }

    const filteredXData = this.xAxeData.slice(index, dataLength);
    const filteredYData = this.yAxeData.map(arr => {
      return arr.slice(index, dataLength);
    });
    return { filteredXData, filteredYData };
  }

  get selectedDataset() {
    const datasetName = this.datasetSelectOptions.find(unit => unit.value === this.datasetSelectValue);
    const formattedXData = this.filteredData.filteredXData.map(timeStr => {
      return this._datePipe.transform(timeStr, 'medium')!;
    })

    return this.setChartData(
      formattedXData,
      this.filteredData.filteredYData[this.datasetSelectValue],
      datasetName!.label,
      '#0d6efd'
    );
  }

  constructor(
    private _forecastService: ForecastService,
    private _prettierPipe: PrettierPipe,
    private _datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this._forecastService.fetchForecastData()
      .subscribe(data => {
        console.log(data)
        for (const [index, arr] of data.data.entries()) {
          if (index === 0) {
            this.xAxeData = arr.slice(1, arr.length);
            continue;
          }
          this.datasetSelectOptions.push(
            {
              label: this._prettierPipe.transform(arr[0], data.units),
              value: (index - 1)
            }
          )
          this.yAxeData.push(arr.slice(1, arr.length));
        }
      })
  }

  setChartData(
    xData: string[],
    yData: number[],
    name: string,
    color: string
  ) {
    return {
      data: {
        labels: [...xData],
        datasets: [{
          label: name,
          data: [...yData],
          fill: false,
          borderColor: color,
          tension: 0.4
        }]
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 0.7,
        plugins: {
          legend: { labels: { color: 'black' } }
        },
        scales: {
          x: {
            ticks: { color: 'black' },
            grid: { color: 'grey', drawBorder: false }
          },
          y: {
            ticks: { color: 'black' },
            grid: { color: 'grey', drawBorder: false }
          }
        }
      }
    }
  }
}
