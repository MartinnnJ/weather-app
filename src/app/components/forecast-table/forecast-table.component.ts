import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../../services/forecast.service';
import ForecastUnits from '../../models/forecast-units.model';
import SelectOptions from '../../models/select-options.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forecast-table',
  templateUrl: './forecast-table.component.html',
  styleUrl: './forecast-table.component.scss'
})
export class ForecastTableComponent implements OnInit {
  isLoading = false;
  isLoadingError = false;
  errorData!: { name: string, msg: string };

  forecastLocation!: string;
  forecastUnits!: ForecastUnits;
  forecastData: {
    tableHeader: string[],
    tableBody: any[][],
  } = { tableHeader: [], tableBody: [] };

  selectOptions: SelectOptions[] = [
    { label: 'For past 7 days', value: 0 },
    { label: 'For upcoming 7 days', value: 1 }
  ];
  selectValue = 1; // ---> two-way binding

  paginatorArr: number[] = [];
  paginatorValue = 1; // ---> two-way binding
  rowsPerPage = 10;

  get paginatedData() {
    const endIndex = this.paginatorValue * this.rowsPerPage;
    const startIndex = endIndex - this.rowsPerPage;
    return this.filteredData.slice(startIndex, endIndex);
  }

  get filteredData() {
    const currentDate = new Date().toISOString().split('T')[0];
    const index = this.forecastData['tableBody']
      .findIndex(arr => arr[0].split('T')[0] === currentDate);

    if (this.selectValue === 0) {
      return this.forecastData['tableBody']
        .slice(0, index);
    }
    return this.forecastData['tableBody']
      .slice(index, this.forecastData['tableBody'].length);
  }

  constructor(private _forecastService: ForecastService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.forecastLocation = this._forecastService.selectedLocation.name;
    this._forecastService.fetchForecastData()
      .subscribe(data => {
        this.forecastUnits = data.units;
        const result = this.transformDataIntoRows(data.data);
        this.forecastData['tableHeader'] = result.tableHeader;
        this.forecastData['tableBody'] = result.tableBody;
        this.paginatorArr = this.calcPaginator(this.filteredData.length, this.rowsPerPage);
        this.isLoadingError = false;
        this.isLoading = false;
      }, (error: HttpErrorResponse) => {
        this.errorData = { name: error.name, msg: error.message };
        this.isLoadingError = true;
        this.isLoading = false;
      })
  }

  calcPaginator(allItemsCount: number, itemsPerPage: number) {
    const length = Math.ceil(allItemsCount / itemsPerPage);
    return new Array(length)
      .fill('_').map((_, i) => i + 1);
  }

  transformDataIntoRows(nestedArr: any[][]) {
    const dataLength = nestedArr[0].length;
    const temp = [];

    for (let row = 0; row < dataLength; row++) {
      const rowArr = [];
      for (let col = 0; col < nestedArr.length; col++) {
        rowArr.push(nestedArr[col][row]);
      }
      temp.push(rowArr);
    }
    return {
      tableHeader: temp[0],
      tableBody: temp.slice(1, temp.length),
    };
  }
}
