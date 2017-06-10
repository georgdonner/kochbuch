import { Pipe, PipeTransform } from '@angular/core';
import { Recipe, Ingredient } from '../recipe';

@Pipe({
  name: 'filterRecipes'
})
export class FilterRecipesPipe implements PipeTransform {

  transform(recipes: Recipe[], query: string): Recipe[] {

    let filteredRecipes = filter(recipes, query);
    return filteredRecipes;

    function filter(toFilter: any[], queryIn: string): any[] {
      let queryArray = new Array<string>();
      if (queryIn === '') {
        return toFilter;
      } else {
        queryArray = queryIn.split(',');
      }
      let filtered = new Array();
      toFilter.forEach(recipe => {
        let queryArrayTmp = queryArray.slice(0);
        queryArray.forEach(query => {
          let hasIngredient = false;
          recipe.ingredients.forEach(ingredient => {
            if (ingredient.name.trim().toLowerCase().includes(query.trim().toLowerCase())) {
              hasIngredient = true;
            }
          });
          let hasCategory = false;
          recipe.categories.forEach(category => {
            if (category.trim().toLowerCase().includes(query.trim().toLowerCase())) {
              hasCategory = true;
            }
          });
          if (recipe.title.trim().toLowerCase().includes(query.trim().toLowerCase()) || hasIngredient || hasCategory) {
            queryArrayTmp.splice(queryArrayTmp.indexOf(query), 1);
          }
          else if (query === '') {
            queryArrayTmp.splice(queryArrayTmp.indexOf(''), 1);
          } else if (query === ' ') {
            queryArrayTmp.splice(queryArrayTmp.indexOf(' '), 1);
          }
        });
        if (queryArrayTmp.length === 0) {
          filtered.push(recipe);
        }
      });
      return filtered;
    }
  }
}
