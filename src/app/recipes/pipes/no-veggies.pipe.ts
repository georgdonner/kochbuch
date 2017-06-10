import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noVeggies'
})
export class NoVeggiesPipe implements PipeTransform {

  transform(categories: string[]): string[] {
    let ctgCopy = categories.slice();
    const vgtIndex = ctgCopy.indexOf('Vegetarisch');
    if (vgtIndex !== -1) {
      ctgCopy.splice(vgtIndex, 1);
    }
    const vgnIndex = ctgCopy.indexOf('Vegan');
    if (vgnIndex !== -1) {
      ctgCopy.splice(vgnIndex, 1);
    }
    return ctgCopy;
  }

}
