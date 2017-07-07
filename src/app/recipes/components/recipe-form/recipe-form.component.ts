import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MzToastService } from 'ng2-materialize';
import { environment } from '../../../../environments/environment';

import { Recipe, Ingredient } from '../../recipe';
import { RecipeService } from '../../services/recipe.service';

declare const filestack: {
  init(apiKey: string): {
    pick({
      accept, maxFiles
    }: {
      accept: Array<string>,
      maxFiles: number,
      transformations: {
        crop: {
          circle: boolean
        }
      }
    }): Promise<{
      filesUploaded: {
        handle: string,
        filename: string
      }[]
    }>
  }
};

@Component({
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  filestackKey: string = environment.filestackKey;

  recipes: Recipe[];

  ingredients = [new Ingredient('', '')];
  newIngredient = new Ingredient('', '');
  categories = [];
  autocomplete: { data: { [key: string]: string } };
  model = new Recipe('', 2, 0, 1, 0, this.ingredients, '');
  vegan = false;
  vegetarian = false;

  // helper variables
  ingredientAdded = false;
  mdPreview = false;
  heroFilename: string;
  descrFilename: string;

  editIngr = new Ingredient('', '');
  editIngrIndex: number;

  public editModalOptions: Materialize.ModalOptions = {
    dismissible: false,
    complete: () => {
      this.model.ingredients[this.editIngrIndex] = this.editIngr;
    }
  };

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private toastService: MzToastService
  ) { }

  ngOnInit() {
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
      let categories = new Set<string>();
      this.recipes.forEach(recipe => {
        recipe.categories.forEach(ctg => {
          categories.add(ctg);
        });
      });
      const suggestions = Array.from(categories);
      let data = {};
      suggestions.forEach(ctg => {
        data[ctg] = null;
      });
      this.autocomplete = {
        data: data,
      };
      window.scrollTo(0, 0);
    });
    this.model.description = '';
  }

  addRecipe() {
    if (this.vegetarian) { this.categories.push('Vegetarisch'); }
    if (this.vegan) { this.categories.push('Vegan'); }
    if (this.categories.length > 0) {
      this.model.categories = this.categories;
    }
    this.recipeService.addRecipe(this.model)
      .subscribe();
  }

  addIngredient() {
    if (this.newIngredient && this.newIngredient.name !== '') {
      const ingr = this.newIngredient;
      this.ingredients.push(ingr);
      this.newIngredient = new Ingredient('', '');
    }
    if (!this.ingredientAdded) {
      // Remove initial empty ingredient on first addition
      this.ingredients.splice(0, 1);
      this.ingredientAdded = true;
    }
  }

  editIngredient(index) {
    this.editIngr = this.model.ingredients[index];
    this.editIngrIndex = index;
  }

  removeIngredient(ingredient) {
    this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
  }

  setPreview(preview: boolean) {
    this.mdPreview = preview;
  }

  addCategory(category) {
    if (category === 'Vegetarisch') { this.vegetarian = true; }
    else if (category === 'Vegan') { this.vegan = true; }
    else if (!this.categories) {
      this.categories = [category];
    } else if (this.categories.includes(category)) {
      // leave the categories as is
    } else {
      this.categories.push(category);
    }
  }

  removeCategory(category) {
    if (category === 'Vegetarisch') { this.vegetarian = false; }
    else if (category === 'Vegan') { this.vegan = false; }
    else { this.categories.splice(this.categories.indexOf(category), 1); }
  }

  hasCategory(category) {
    return this.categories.includes(category);
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
      transformations: {
        crop: {
          circle: false
        }
      }
    });
    const handle = result.filesUploaded[0].handle;
    this.heroFilename = result.filesUploaded[0].filename;
    this.uploadToast(this.descrFilename);
    this.model.heroImage = 'https://process.filestackapi.com/resize=w:2000,fit:max/quality=value:80/compress/' + handle;
  }

  async showDescPicker() {
    const client = filestack.init(this.filestackKey);
    const result = await client.pick({
      accept: ['image/*'],
      maxFiles: 1,
      transformations: {
        crop: {
          circle: false
        }
      }
    });
    const handle = result.filesUploaded[0].handle;
    this.descrFilename = result.filesUploaded[0].filename;
    this.uploadToast(this.descrFilename);
    this.model.descrImage = 'https://process.filestackapi.com/resize=w:2000,fit:max/quality=value:80/compress/' + handle;
  }

  uploadToast(filename: string) {
    this.toastService.show('"' + filename + '" wurde erfolgreich hochgeladen!', 3000, 'green rounded');
  }

  gotoRecipes() {
    this.router.navigate(['/recipes']);
  }

}
