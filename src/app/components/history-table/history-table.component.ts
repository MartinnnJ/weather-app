import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.scss'
})
export class HistoryTableComponent implements OnInit {
  tableData: (number | string)[][] = [];

  constructor(private _calcServive: CalculatorService) {}

  ngOnInit(): void {
    this.tableData = this._calcServive.readFromLocalStorage();
    this._calcServive.calculation
      .subscribe(data => {
        console.log(data);
        const dateWithTime = this._calcServive.currentTime();
        data.push(dateWithTime);
        this.tableData.unshift(data);
        if (this.tableData.length > 5) this.tableData.pop();
        this._calcServive.saveInLocalStorage(data);
      })
  }

  onTableClear() {
    this.tableData = [];
    this._calcServive.clearLocalStorage();
  }
}
