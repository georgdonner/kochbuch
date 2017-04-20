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

    var ingrArray = ingrQuery.trim().split(',');
    var ctgArray = ctgQuery.trim().split(',');

    if (ctgQuery == '') {
      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          ingrArray.forEach((ingr) => {
            if(ingredient.name.toLowerCase().indexOf(ingr.toLowerCase())!==-1) {
              ingrArray.splice(ingrArray.indexOf(ingr),1);
            }
          })
        });
        if (ingrArray.length === 0) {
          filteredRecipes.push(recipe);
        }
      });
      return filteredRecipes
    }
    if (ingrQuery == '') {
      recipes.forEach((recipe) => {
        if (recipe.categories) {
          recipe.categories.forEach((category) => {
            ctgArray.forEach((ctg) => {
              if(category.toLowerCase().indexOf(ctg.toLowerCase())!==-1) {
                ctgArray.splice(ctgArray.indexOf(ctg),1);
              }
            })
          });
        }
        if (ctgArray.length === 0) {
          filteredRecipes.push(recipe);
        }
      });
      return filteredRecipes;
    }
    recipes.forEach((recipe) => {
      let ingrMatch: boolean = true;
      recipe.ingredients.forEach((ingredient) => {
        ingrArray.forEach((ingr) => {
          if(ingredient.name.toLowerCase().indexOf(ingr.toLowerCase())!==-1) {
            ingrArray.splice(ingrArray.indexOf(ingr),1);
          }
        })
        if(ingrArray.length === 0) {
          ingrMatch = true;
        }
      });
      if (recipe.categories && ingrMatch) {
        recipe.categories.forEach((category) => {
          ctgArray.forEach((ctg) => {
            if(category.toLowerCase().indexOf(ctg.toLowerCase())!==-1) {
              ctgArray.splice(ctgArray.indexOf(ctg),1);
            }
          })
        });
        if (ctgArray.length === 0) {
          filteredRecipes.push(recipe);
        }
      }
    });
    return filteredRecipes;
  } 
}
