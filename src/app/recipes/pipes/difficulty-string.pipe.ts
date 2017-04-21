import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'difficultyString'
})
export class DifficultyStringPipe implements PipeTransform {

  transform(difficulty: number): string {
    switch (difficulty) {
      case 1:
        return 'Einfach';
      case 2: 
        return 'Mittel'
      case 3:
        return 'Schwer'

      default:
        return 'Kein Schwierigkeitsgrad angegeben'
    }
  }

}
