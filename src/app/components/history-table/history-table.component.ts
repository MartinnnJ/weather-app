import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.scss'
})
export class HistoryTableComponent implements OnInit, OnDestroy {
  tableData: (number | string)[][] = [];
  calculationSubs!: Subscription;

  constructor(private _calcServive: CalculatorService) {}

  ngOnInit(): void {
    this.tableData = this._calcServive.readFromLocalStorage();
    this.calculationSubs = this._calcServive.calculation
      .subscribe(data => {
        console.log(data);
        this.tableData = this._calcServive.saveInLocalStorage(data);
      })
  }

  ngOnDestroy(): void {
    this.calculationSubs.unsubscribe();
  }

  onTableClear() {
    this.tableData = [];
    this._calcServive.clearLocalStorage();
  }
}
