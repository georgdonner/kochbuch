import { Component, OnInit } from '@angular/core';
import { Recipe } from "../recipe";
import { RecipesService } from "../recipes.service";
import { Ingredient } from "../ingredient";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  // full details to be shown?
  fullDetails: boolean;

  // instantiate recipes to an empty array
  recipes: Recipe[];

  constructor(private recipesService: RecipesService) {

  }

  ngOnInit() {
    // retrieve recipes from the API
    this.recipesService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  addRecipe(newRecipe: Recipe){
    this.recipesService.addRecipe(newRecipe)
      .subscribe(recipe => {
        this.recipes.push(recipe);
      });
  }

  toggleFullDetails() {
    this.fullDetails = !this.fullDetails;
  }
}
