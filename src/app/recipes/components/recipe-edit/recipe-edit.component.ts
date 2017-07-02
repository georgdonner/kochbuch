import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { environment } from '../../../../environments/environment';

import { Recipe, Ingredient } from '../../recipe';
import { RecipeService } from '../../services/recipe.service';

declare const filestack: {
  init(apiKey: string): {
    pick({ accept, maxFiles, maxSize, transformations }: { accept: Array<string>, maxFiles: number, maxSize: number, transformations: { crop: { circle: boolean } } }): Promise<{ filesUploaded: { handle: string }[] }> 
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
  autocomplete: { data: { [key: string]: string } };
  mdPreview = false;

  editIngr = new Ingredient('', '');
  editIngrIndex: number;

  public editModalOptions: Materialize.ModalOptions = {
    dismissible: false,
    complete: () => {
      this.recipe.ingredients[this.editIngrIndex] = this.editIngr;
    }
  };

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.recipeService.getRecipe(params['id']))
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
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
  }

  save() {
    this.recipeService.updateRecipe(this.recipe)
      .subscribe(() => {
        this.gotoRecipe();
      });
  }

  addIngredient() {
    if (this.newIngredient && this.newIngredient.name !== '') {
      const ingr = this.newIngredient;
      this.recipe.ingredients.push(ingr);
      this.newIngredient = new Ingredient('', '');
    }
  }

  editIngredient(index) {
    this.editIngr = this.recipe.ingredients[index];
    this.editIngrIndex = index;
  }

  removeIngredient(ingredient) {
    this.recipe.ingredients.splice(this.recipe.ingredients.indexOf(ingredient), 1);
  }

  setPreview(preview: boolean) {
    this.mdPreview = preview;
  }

  addCategory(category) {
    if (!this.recipe.categories) {
      if (category === 'Vegan') {
        this.recipe.categories = ['Vegetarisch'];
      }
      this.recipe.categories.push(category);
    } else if (this.recipe.categories.includes(category)) {
      // leave the categories as is
    } else {
      if (category === 'Vegan') {
        if (!this.recipe.categories.includes('Vegetarisch')) {
          this.recipe.categories.push('Vegetarisch');
        }
      }
      this.recipe.categories.push(category);
    }
  }

  removeCategory(category) {
    if (category === 'Vegetarisch') {
      if (this.recipe.categories.includes('Vegan')) {
        this.recipe.categories.splice(this.recipe.categories.indexOf('Vegan'), 1);
      }
    }
    this.recipe.categories.splice(this.recipe.categories.indexOf(category), 1);
  }

  hasCategory(category) {
    return this.recipe.categories.includes(category);
  }

  toggleCategory(category) {
    if (!this.recipe.categories.includes(category)) {
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
      maxSize: 10485760,
      transformations: {
        crop: {
          circle: false
        }
      }
    });
    const handle = result.filesUploaded[0].handle;
    this.recipe.heroImage = 'https://process.filestackapi.com/resize=w:2000,fit:max/quality=value:80/compress/'+handle;
  }

  async showDescPicker() {
    const client = filestack.init(this.filestackKey);
    const result = await client.pick({
      accept: ['image/*'],
      maxFiles: 1,
      maxSize: 10485760,
      transformations: {
        crop: {
          circle: false
        }
      }
    });
    const handle = result.filesUploaded[0].handle;
    this.recipe.descrImage = 'https://process.filestackapi.com/resize=w:2000,fit:max/quality=value:80/compress/'+handle;
  }

  gotoRecipe() {
    this.router.navigate(['/recipe', this.recipe._id]);
  }

}
