import { Directive, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appNow]'
})
export class NowDirective implements OnChanges {
  @HostBinding('class.table-primary') isNow = false;

  @Input('appNow') dateString!: string;

  ngOnChanges(changes: SimpleChanges): void {
    const dateStringInputChange = changes['dateString'];

    if (dateStringInputChange.currentValue?.length > 0) {
      this.dateString = dateStringInputChange.currentValue;

      const inputDate = this.dateString.toString().split('T'); // GMT
      const currentDate = new Date().toISOString().split('T'); // GMT

      if (inputDate[0] === currentDate[0]) {
        const inputHour = +inputDate[1].split(':')[0];
        const currentHour = +currentDate[1].split(':')[0];

        if (inputHour === currentHour) {
          this.isNow = true;
        }
      }
    }
  }
}
