import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from '../recipe';
import { Ingredient } from '../ingredient';
import { RecipeService } from '../recipe.service';

declare const filestack: {
  init(apiKey: string): {
    pick({ maxFiles }: { maxFiles: number}): Promise<{ filesUploaded: { url: string }[] }> 
  }
};

@Component({
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {

  ingredients = [new Ingredient( '', '' )];
  newIngredient = new Ingredient('', '');
  categories = [];
  model = new Recipe('', 0, 0, this.ingredients, '');
  ingredientAdded = false;

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) { }

  addRecipe() {
    if(this.categories.length > 0) {
      this.model.categories = this.categories
    }
    console.log(this.model.categories);
    this.recipeService.addRecipe(this.model)
      .subscribe();
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

  addCategory(category) {
    this.categories.push(category);
    console.log(this.categories);
  }

  removeCategory(category) {
    this.categories.splice(this.categories.indexOf(category),1);
  }

  async showPicker() {
    const client = filestack.init('AwD48ceQaWtGBs9plMog7z');
    const result = await client.pick({ maxFiles: 1 });
    const url = result.filesUploaded[0].url;
    this.model.descrImage = url;
  }

  gotoRecipes() {
    this.router.navigate(['/recipes']);
  }

}

