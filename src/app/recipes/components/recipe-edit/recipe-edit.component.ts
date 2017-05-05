import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { environment } from '../../../../environments/environment';

import { Recipe, Ingredient } from '../../recipe';
import { RecipeService } from '../../services/recipe.service';

declare const filestack: {
  init(apiKey: string): {
    pick({ accept, maxFiles, maxSize }: { accept: Array<string>, maxFiles: number, maxSize: number }): Promise<{ filesUploaded: { handle: string }[] }> 
  }
};

@Component({
  templateUrl: './recipe-edit.component.html',
  styleUrls: [
    './recipe-edit.component.css',
    '../recipe-form/recipe-form.component.css'
  ]
})
export class RecipeEditComponent implements OnInit {
  filestackKey: string = environment.filestackKey;

  recipe: Recipe;
  recipes: Recipe[];
  newIngredient = new Ingredient('', '');

  editing = false;
  editIngr: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.recipeService.getRecipe(params['id']))
      .subscribe((recipe: Recipe) => this.recipe = recipe);
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
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

  editIngredient(index) {
    if (this.editing) {
      this.newIngredient = new Ingredient('', '');
      this.editing = false;
    } else {
      this.editing = true;
      this.editIngr = index;
      this.newIngredient = this.recipe.ingredients[index];
    }
  }

  updateIngredient(index) {
    this.recipe.ingredients[index] = this.newIngredient;
    this.newIngredient = new Ingredient('', '');
    this.editing = false;
  }

  removeIngredient(ingredient) {
    if (this.editing) {
      this.newIngredient = new Ingredient('', '');
      this.editing = false;
    }
    this.recipe.ingredients.splice(this.recipe.ingredients.indexOf(ingredient), 1);
  }

  addCategory(category) {
    if(!this.recipe.categories) {
      this.recipe.categories = [category]
    } else if(this.recipe.categories.includes(category)) {
      // leave the categories as is
    } else {
      this.recipe.categories.push(category);
    }
  }

  removeCategory(category) {
    this.recipe.categories.splice(this.recipe.categories.indexOf(category),1);
  }

  getCategories() {
    let categories = new Set<string>();
    this.recipes.forEach(recipe => {
      recipe.categories.forEach(ctg => {
        categories.add(ctg);
      });
    });
    return Array.from(categories);
  }

  async showHeroPicker() {
    const client = filestack.init(this.filestackKey);
    const result = await client.pick({ 
      accept: ['image/*'],
      maxFiles: 1,
      maxSize: 10485760
    });
    const handle = result.filesUploaded[0].handle;
    this.recipe.heroImage = 'https://process.filestackapi.com/resize=w:2000,fit:max/quality=value:80/compress/'+handle;
  }

  async showDescPicker() {
    const client = filestack.init(this.filestackKey);
    const result = await client.pick({
      accept: ['image/*'],
      maxFiles: 1,
      maxSize: 10485760
    });
    const handle = result.filesUploaded[0].handle;
    this.recipe.descrImage = 'https://process.filestackapi.com/resize=w:2000,fit:max/quality=value:80/compress/'+handle;
  }

  gotoRecipe() {
    this.router.navigate(['/recipe',this.recipe._id]);
  }

}
