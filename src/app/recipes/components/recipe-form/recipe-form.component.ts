import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

import { Recipe, Ingredient } from '../../recipe';
import { RecipeService } from '../../services/recipe.service';

declare const filestack: {
  init(apiKey: string): {
    pick({ accept, maxFiles }: { accept: Array<string>, maxFiles: number, transformations: { crop: { circle: boolean } } }): Promise<{ filesUploaded: { handle: string, filename: string }[] }> 
  }
};

@Component({
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  filestackKey: string = environment.filestackKey;

  recipes: Recipe[];

  ingredients = [new Ingredient( 'Test', 'Hint' )];
  newIngredient = new Ingredient('', '');
  categories = [];
  autocomplete: { data: { [key: string]: string } };
  model = new Recipe('', 2, 0, 1, 0, this.ingredients, '');

  // helper variables
  ingredientAdded = false;
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
    private router: Router
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
    if (!this.ingredientAdded){
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

  addCategory(category) {
    if (!this.categories) {
      if (category === 'Vegan') {
        this.categories = ['Vegetarisch'];
      }
      this.categories.push(category);
    } else if (this.categories.includes(category)) {
      // leave the categories as is
    } else {
      if (category === 'Vegan') {
        if (!this.categories.includes('Vegetarisch')) {
          this.categories.push('Vegetarisch');
        }
      }
      this.categories.push(category);
    }
  }

  removeCategory(category) {
    if (category === 'Vegetarisch') {
      if (this.categories.includes('Vegan')) {
        this.categories.splice(this.categories.indexOf('Vegan'), 1);
      }
    }
    this.categories.splice(this.categories.indexOf(category), 1);
  }

  hasCategory(category) {
    return this.categories.includes(category);
  }

  toggleCategory(category) {
    if (!this.categories) {
      this.addCategory(category);
    } else if (!this.categories.includes(category)) {
      this.addCategory(category);
    } else {
      this.removeCategory(category);
    }
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
    this.model.heroImage = 'https://process.filestackapi.com/resize=w:2000,fit:max/quality=value:80/compress/'+handle;
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
    this.model.descrImage = 'https://process.filestackapi.com/resize=w:2000,fit:max/quality=value:80/compress/'+handle;
  }

  gotoRecipes() {
    this.router.navigate(['/recipes']);
  }

}

