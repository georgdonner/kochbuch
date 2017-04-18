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

  uploadedFileUrls: string[] = [];
  ingredients = new Array<Ingredient>();
  newIngredient = new Ingredient('', '');
  model = new Recipe('', 0, 0, this.ingredients, '');

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

  hello() {
    console.log('hello');
  }

  async showPicker() {
    const client = filestack.init('AwD48ceQaWtGBs9plMog7z');
    const result = await client.pick({ maxFiles: 1 });
    const url = JSON.stringify(result.filesUploaded[0].url);
    this.uploadedFileUrls.push(url);
  }

}
