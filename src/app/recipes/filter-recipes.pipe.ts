import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from './ingredient';

@Pipe({
  name: 'filterRecipes'
})
export class FilterRecipesPipe implements PipeTransform {

  transform(recipes: any[], ingrQuery: string, ctgQuery: string): any[] {
    if(ingrQuery == '' && ctgQuery == '') {
      return recipes;
    }
    var filteredRecipes = new Array<Recipe>();
    if (ctgQuery == '') {
      recipes.forEach(function(recipe) {
        recipe.ingredients.forEach(function(ingredient) {
          if(ingredient.name.toLowerCase().indexOf(ingrQuery.toLowerCase())!==-1) {
            filteredRecipes.push(recipe);
          }
        });
      });
      return filteredRecipes
    }
    if (ingrQuery == '') {
      recipes.forEach(function(recipe) {
        if (recipe.categories) {
          recipe.categories.forEach(function(category) {
            if(category.toLowerCase().indexOf(ctgQuery.toLowerCase())!==-1) {
              filteredRecipes.push(recipe);
            }
          });
        }
      });
      return filteredRecipes;
    }
    recipes.forEach(function(recipe) {
      let ingrMatch: boolean = true;
      recipe.ingredients.forEach(function(ingredient) {
        if(ingredient.name.toLowerCase().indexOf(ingrQuery.toLowerCase())!==-1) {
          ingrMatch = true;
        }
      });
      if (recipe.categories && ingrMatch) {
        recipe.categories.forEach(function(category) {
          if(category.toLowerCase().indexOf(ctgQuery.toLowerCase())!==-1) {
            filteredRecipes.push(recipe);
          }
        });
      }
    });
    return filteredRecipes;
  } 
}
