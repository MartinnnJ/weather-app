import { Component, EventEmitter, Input, Output } from '@angular/core';
import SelectOptions from '../../models/select-options.model';

@Component({
  selector: 'app-forecast-select',
  templateUrl: './forecast-select.component.html',
  styleUrl: './forecast-select.component.scss'
})
export class ForecastSelectComponent {
  @Input() options!: SelectOptions[];

  @Input() value!: number;
  @Output() valueChange = new EventEmitter<number>();

  onSelectChange(event: Event) {
    const el = event.target as HTMLSelectElement;
    this.valueChange.emit(+el.value);
  }
}
