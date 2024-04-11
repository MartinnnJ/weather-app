import { Directive, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appLastHour]'
})
export class LastHourDirective implements OnChanges {
  @HostBinding('style.borderBottom') border!: string;

  @Input('appLastHour') dateString!: string;

  ngOnChanges(changes: SimpleChanges): void {
    const dateStringInputChange = changes['dateString'];

    if (dateStringInputChange.currentValue?.length > 0) {
      this.dateString = dateStringInputChange.currentValue;
      const timeOnly = this.dateString.split('T')[1];

      if (timeOnly.split(':')[0] === '23') {
        this.border = '2px solid black';
      }
    }
  }

}
