import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-forecast-paginator',
  templateUrl: './forecast-paginator.component.html',
  styleUrl: './forecast-paginator.component.scss'
})
export class ForecastPaginatorComponent {
  @Input() values!: number[];
  
  @Input() selectedPage!: number;
  @Output() selectedPageChange = new EventEmitter<number>();

  onPaginatorClick(event: MouseEvent) {
    const link = event.target as HTMLAnchorElement;
    const pageNum = +link.dataset['page']!;

    if (pageNum && pageNum !== this.selectedPage) {
      this.selectedPageChange.emit(pageNum);
    }
  }
}
