import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Recipe, Ingredient } from '../../recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-print',
  templateUrl: './recipe-print.component.html',
  styleUrls: [
    './recipe-print.component.css'
  ]
})
export class RecipePrintComponent implements OnInit {

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

  back() {
    this.router.navigate(['/recipe', this.recipe._id]);
  }

}
