import { Component, Output, EventEmitter } from '@angular/core';
import { Recipe } from "../recipe";
import { Ingredient } from "../ingredient";

declare const filestack: {
  init(apiKey: string): {
    pick({ maxFiles }: { maxFiles: number}): Promise<{ filesUploaded: { url: string }[] }> 
  }
};

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {

  // initialize with empty ingredient to enable display in template
  ingredients = [new Ingredient("","")];
  newIngredient = new Ingredient('', '');
  categories = [''];
  model = new Recipe('', 0, 0, this.ingredients, '');
  ingredientAdded = false;

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
      this.newIngredient = new Ingredient('', '');
    }
    if (!this.ingredientAdded){
      // Remove initial empty ingredient on first addition
      this.ingredients.splice(0,1);
      this.ingredientAdded = true;
    }
  }

  removeIngredient(ingredient) {
    this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
  }

  addCategory(event) {
    this.categories.push(event.target.value);
    event.target.value = '';
  }

  async showPicker() {
    const client = filestack.init('AwD48ceQaWtGBs9plMog7z');
    const result = await client.pick({ maxFiles: 1 });
    const url = JSON.stringify(result.filesUploaded[0].url);
    this.model.descrImage = url;
  }

}

