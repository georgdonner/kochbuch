import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from './ingredient';

@Pipe({
  name: 'filterByIngredient'
})
export class FilterByIngredientPipe implements PipeTransform {

  transform(recipes: any[], query: string): any[] {
    if(query=='') {
      return recipes;
    }
    var filteredRecipes = new Array<Recipe>();
    recipes.forEach(function(recipe) {
      recipe.ingredients.forEach(function(ingredient) {
        if(ingredient.name.toLowerCase().indexOf(query.toLowerCase())!==-1) {
          filteredRecipes.push(recipe);
        }
      });
    });
    return filteredRecipes;
  }

}
