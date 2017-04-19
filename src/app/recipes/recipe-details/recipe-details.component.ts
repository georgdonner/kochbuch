import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;

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

  gotoRecipes() {
    this.router.navigate(['/recipes']);
  }

  edit(recipe: Recipe) {
    this.router.navigate(['/recipe', recipe._id, 'edit']);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe._id)
      .subscribe();
  }
}
