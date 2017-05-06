import { Pipe, PipeTransform } from '@angular/core';

import { Recipe } from '../recipe';

@Pipe({
  name: 'sortRecipes'
})
export class SortRecipesPipe implements PipeTransform {

  transform(recipes: Array<Recipe>, sortby: string, desc: boolean): any {
    switch (sortby) {
      case 'cook-counter':
        recipes.sort(function(a, b) {
          return a.cookCount - b.cookCount;
        });
        break;

      case 'duration':
        recipes.sort(function(a, b) {
          return a.duration - b.duration;
        });
        break;

      case 'difficulty':
        recipes.sort(function(a, b) {
          return a.difficulty - b.difficulty;
        });
        break;

      case 'ingredient-count':
        recipes.sort(function(a, b) {
          return a.ingredients.length - b.ingredients.length;
        });
        break;

      case 'date':
        recipes.sort(function (a, b) {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
        break;

      default:
        break;
    }
    if (desc) {
      recipes.reverse();
    }
    return recipes;
  }

}
