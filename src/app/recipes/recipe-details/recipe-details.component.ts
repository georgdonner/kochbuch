import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit }  from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  templateUrl: './recipe-details.component.html',
  styleUrls: [
    './recipe-details.component.css',
    '../recipe-form/recipe-form.component.css'
  ]
})
export class RecipeDetailsComponent implements OnInit {
  @ViewChild('descrImage') el:ElementRef;
  recipe: Recipe;
  desiredServings: number;

  descrImageRatio: number;

  constructor(
    private rd: Renderer2,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.recipeService.getRecipe(params['id']))
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe
        this.desiredServings = recipe.servings
      });
  }

  gotoRecipes() {
    this.router.navigate(['/recipes']);
  }

  cooked() {
    ++this.recipe.cookCount;
    this.recipeService.updateRecipe(this.recipe)
      .subscribe();
  }

  edit(recipe: Recipe) {
    this.router.navigate(['/recipe', recipe._id, 'edit']);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe._id)
      .subscribe();
  }
}
