import { Component, Output, EventEmitter } from '@angular/core';
import { Recipe } from "../recipe";
import { Ingredient } from "../ingredient";

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {

  ingredients = new Array<Ingredient>();
  newIngredient = new Ingredient('', '');
  model = new Recipe('', 0, 0, this.ingredients, '', '');

  @Output()
  add: EventEmitter<Recipe> = new EventEmitter();

  constructor() { }

  addRecipe(recipe: Recipe) {
    this.add.emit(recipe);
  }

  addIngredient() {
    if (this.newIngredient) {
        const ingr = this.newIngredient;

        this.ingredients.push(ingr);
        this.newIngredient = new Ingredient('', '');
      }
  }

}
