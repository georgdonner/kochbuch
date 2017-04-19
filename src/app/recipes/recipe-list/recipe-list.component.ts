import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{

  selectedRecipe: Recipe;
  recipes: Recipe[];

  constructor(
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    // retrieve recipes from the API
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
      console.log(this.recipes);
    });
  }

  onSelect(recipe: Recipe) {
    this.router.navigate(['/recipe', recipe._id]);
  }

  newRecipe() {
    this.router.navigate(['/recipes/new']);
  }

}
