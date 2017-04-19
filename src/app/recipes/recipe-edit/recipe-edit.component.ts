import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Recipe } from '../recipe';
import { Ingredient } from '../ingredient';
import { RecipeService } from '../recipe.service';

declare const filestack: {
  init(apiKey: string): {
    pick({ accept, maxFiles }: { accept: Array<string>, maxFiles: number}): Promise<{ filesUploaded: { url: string }[] }> 
  }
};

@Component({
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipe: Recipe;
  newIngredient = new Ingredient('', '');

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.recipeService.getRecipe(params['id']))
      .subscribe((recipe: Recipe) => this.recipe = recipe);
  }

  save() {
    this.recipeService.updateRecipe(this.recipe)
      .subscribe();
  }

  addIngredient() {
    if (this.newIngredient) {
      const ingr = this.newIngredient;
      this.recipe.ingredients.push(ingr);
      this.newIngredient = new Ingredient('', '');
    }
  }

  removeIngredient(ingredient) {
    this.recipe.ingredients.splice(this.recipe.ingredients.indexOf(ingredient), 1);
  }

  addCategory(category) {
    if(!this.recipe.categories) {
      this.recipe.categories = [category]
    } else {
      this.recipe.categories.push(category);
    }
  }

  removeCategory(category) {
    this.recipe.categories.splice(this.recipe.categories.indexOf(category),1);
  }

  async showHeroPicker() {
    const client = filestack.init('AwD48ceQaWtGBs9plMog7z');
    const result = await client.pick({ 
      accept: ['image/*'],
      maxFiles: 1 
    });
    const url = result.filesUploaded[0].url;
    this.recipe.heroImage = url;
  }

  async showDescPicker() {
    const client = filestack.init('AwD48ceQaWtGBs9plMog7z');
    const result = await client.pick({
      accept: ['image/*'],
      maxFiles: 1
    });
    const url = result.filesUploaded[0].url;
    this.recipe.descrImage = url;
  }

  gotoRecipe() {
    this.router.navigate(['/recipe',this.recipe._id]);
  }

}
