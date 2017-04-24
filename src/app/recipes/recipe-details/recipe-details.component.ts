import { Component, OnInit }  from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { CurrentQueryService } from '../current-query.service';

@Component({
  templateUrl: './recipe-details.component.html',
  styleUrls: [
    './recipe-details.component.css',
    '../recipe-form/recipe-form.component.css'
  ]
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  desiredServings: number;

  descrImageRatio: number;

  constructor(
    private recipeService: RecipeService,
    private queryService: CurrentQueryService,
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

  searchCtg(ctg: string) {
    this.queryService.setQuery('', ctg);
    this.gotoRecipes();
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
