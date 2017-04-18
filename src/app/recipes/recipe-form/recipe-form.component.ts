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
  array = new Array<String>();
  newIngredient = new Ingredient('', '');
  model = new Recipe('', 0, 0, this.ingredients, '');
  diagnosis = JSON.stringify(this.newIngredient);

  @Output()
  add: EventEmitter<Recipe> = new EventEmitter();

  constructor() { }

  addRecipe() {
    this.add.emit(this.model);
  }

  addIngredient() {
    if (this.newIngredient) {
        const ingr = this.newIngredient;

        this.ingredients.push(ingr);
        console.log(this.ingredients);
        this.newIngredient = new Ingredient('', '');
  }
}

}