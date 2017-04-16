import { Component, OnInit } from '@angular/core';
import { Recipe } from "../recipe";
import { RecipesService } from "../recipes.service";
import { Ingredient } from "../ingredient";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  // instantiate recipes to an empty array
  recipes: Recipe[];
  ingredients = new Array<Ingredient>();
  newIngredient = new Ingredient('', '');
  model = new Recipe('', 0, 0, this.ingredients, '');

  constructor(private recipesService: RecipesService) {

  }

  ngOnInit() {
    // retrieve recipes from the API
    this.recipesService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  addRecipe(event){
    event.preventDefault();

    const newRecipe = this.model;

    this.recipesService.addRecipe(newRecipe)
      .subscribe(recipe => {
        this.recipes.push(recipe);
      })
  }

  addIngredient() {
    if (this.newIngredient) {
        const ingr = this.newIngredient;

        this.ingredients.push(ingr);
        this.newIngredient = new Ingredient('', '');
      }
  }
}
