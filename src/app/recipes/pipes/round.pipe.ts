import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value: number, precision: number): string {
    if(value % 1 === 0) {
      return value.toString();
    } else {
      return value.toPrecision(precision);
    }
  }

}
