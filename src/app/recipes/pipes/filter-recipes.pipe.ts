import { Pipe, PipeTransform } from '@angular/core';
import { Recipe, Ingredient } from '../recipe';

@Pipe({
  name: 'filterRecipes'
})
export class FilterRecipesPipe implements PipeTransform {

  transform(recipes: Recipe[], ingrQuery: string, ctgQuery: string, titleQuery: string): Recipe[] {
    
    let titleFilter = filterTitle(recipes, titleQuery);
    let ingrFilter = filterIngredients(titleFilter, ingrQuery);
    let ctgFilter = filterCategories(ingrFilter, ctgQuery);
    return ctgFilter;

    function filterTitle(toFilter: Recipe[], query: string): Recipe[] {
      let titleFiltered = new Array<Recipe>();
      if (query === '') {
        return toFilter;
      }
      toFilter.forEach((recipe) => {
        if (recipe.title.toLowerCase().includes(titleQuery.toLowerCase())) {
          titleFiltered.push(recipe);
        }
      })
      return titleFiltered;
    }

    function filterIngredients(toFilter: Recipe[], query: string): Recipe[] {
      let ingrFiltered = new Array<Recipe>();
      if (query === '') {
        return toFilter;
      }
      const ingrArray = query.split(',');
      toFilter.forEach((recipe) => {
        // make a temp copy of the ingredient array
        let ingrArrayTmp = ingrArray.slice(0);
        recipe.ingredients.forEach((ingredient) => {
          ingrArrayTmp.forEach((ingr) => {
            if(ingredient.name.trim().toLowerCase().includes(ingr.trim().toLowerCase())) {
              // ingredient was found in the recipe
              ingrArrayTmp.splice(ingrArrayTmp.indexOf(ingr), 1);
            }
          });
        });
        if (ingrArrayTmp.length === 0) {
          // all ingredients in recipe
          ingrFiltered.push(recipe);
        }
      });
      return ingrFiltered;
    }

    function filterCategories(toFilter: Recipe[], query: string): Recipe[]  {
      let ctgFiltered = new Array<Recipe>();
      if (query === '') {
        return toFilter;
      }
      const ctgArray = query.split(',');
      toFilter.forEach((recipe) => {
        // make a temp copy of category array
        let ctgArrayTmp = ctgArray.slice(0);
        if (recipe.categories) {
          recipe.categories.forEach((category) => {
            ctgArrayTmp.forEach((ctg) => {
              if(category.trim().toLowerCase().includes(ctg.trim().toLowerCase())) {
                // recipe has category
                ctgArrayTmp.splice(ctgArrayTmp.indexOf(category), 1);
              }
            })
          });
        }
        if (ctgArrayTmp.length === 0) {
          // recipe has all categories
          ctgFiltered.push(recipe);
        }
      });
      return ctgFiltered;
    }
  }
}
