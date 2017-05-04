import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from '../../recipe';
import { RecipeService } from '../../services/recipe.service';
import { CurrentQueryService } from '../../services/current-query.service';

@Component({
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{

  selectedRecipe: Recipe;
  recipes: Recipe[];

  ingrQuery: string = '';
  ctgQuery: string = '';
  titleQuery: string = '';

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private queryService: CurrentQueryService
  ) { }

  ngOnInit() {
    // retrieve recipes from the API
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.getQuery();
    });
  }

  getQuery() {
    this.ingrQuery = this.queryService.getQuery().ingrQuery;
    this.ctgQuery = this.queryService.getQuery().ctgQuery;
    this.titleQuery = this.queryService.getQuery().titleQuery;
  }

  onSelect(recipe: Recipe) {
    this.queryService.setQuery(this.ingrQuery, this.ctgQuery, this.titleQuery);
    this.router.navigate(['/recipe', recipe._id]);
  }

  newRecipe() {
    this.router.navigate(['/recipes/new']);
  }

}
