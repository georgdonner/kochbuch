import { Pipe, PipeTransform } from '@angular/core';
import { Recipe, Ingredient } from '../recipe';

@Pipe({
  name: 'filterRecipes'
})
export class FilterRecipesPipe implements PipeTransform {

  transform(recipes: any[], ingrQuery: string, ctgQuery: string, titleQuery: string): any[] {
    if (ingrQuery == '' && ctgQuery == '' && titleQuery == '') {
      return recipes;
    }

    recipes = filterTitle();

    if (ingrQuery == '' && ctgQuery == '') {
      return recipes;
    }

    let filteredRecipes = new Array<Recipe>();
    const ingrArray = ingrQuery.trim().split(',');
    const ctgArray = ctgQuery.trim().split(',');

    if (ctgQuery == '') {
      recipes.forEach((recipe) => {
        let ingrArrayTmp = ingrArray.slice(0);
        recipe.ingredients.forEach((ingredient) => {
          ingrArrayTmp.forEach((ingr) => {
            if(ingredient.name.toLowerCase().indexOf(ingr.toLowerCase())!==-1) {
              ingrArrayTmp.splice(ingrArrayTmp.indexOf(ingr),1);
            }
          })
        });
        if (ingrArrayTmp.length === 0) {
          filteredRecipes.push(recipe);
        }
      });
      return filteredRecipes
    }
    
    if (ingrQuery == '') {
      recipes.forEach((recipe) => {
        let ctgArrayTmp = ctgArray.slice(0);
        if (recipe.categories) {
          recipe.categories.forEach((category) => {
            ctgArrayTmp.forEach((ctg) => {
              if(category.toLowerCase().indexOf(ctg.toLowerCase())!==-1) {
                ctgArrayTmp.splice(ctgArrayTmp.indexOf(ctg),1);
              }
            })
          });
        }
        if (ctgArrayTmp.length === 0) {
          filteredRecipes.push(recipe);
        }
      });
      return filteredRecipes;
    }

    recipes.forEach((recipe) => {
      let ingrMatch: boolean = false;

      recipe.ingredients.forEach((ingredient) => {
        let ingrArrayTmp = ingrArray.slice(0);
        ingrArrayTmp.forEach((ingr) => {
          if(ingredient.name.toLowerCase().indexOf(ingr.toLowerCase())!==-1) {
            ingrArrayTmp.splice(ingrArrayTmp.indexOf(ingr),1);
          }
        })
        if(ingrArrayTmp.length === 0) {
          ingrMatch = true;
        }
      });
      if (recipe.categories && ingrMatch) {
        let ctgArrayTmp = ctgArray.slice(0);
        recipe.categories.forEach((category) => {
          ctgArrayTmp.forEach((ctg) => {
            if(category.toLowerCase().indexOf(ctg.toLowerCase())!==-1) {
              ctgArrayTmp.splice(ctgArrayTmp.indexOf(ctg),1);
            }
          })
        });
        if (ctgArrayTmp.length === 0) {
          filteredRecipes.push(recipe);
        }
      }
    });
    return filteredRecipes;

    function filterTitle(): Recipe[] {
      let titleFiltered = new Array<Recipe>();
      if (titleQuery === '') {
        return recipes;
      }
      recipes.forEach((recipe) => {
        if (recipe.title.toLowerCase().includes(titleQuery.toLowerCase())) {
          titleFiltered.push(recipe);
        }
      })
      return titleFiltered;
    }
  } 
}
