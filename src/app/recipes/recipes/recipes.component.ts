import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from "../recipe";
import { RecipesService } from "../recipes.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  @Input()
  activeRecipe = false;

  recipes: Recipe[];

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    // retrieve recipes from the API
    this.recipesService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  addRecipe(newRecipe) {
    this.recipesService.addRecipe(newRecipe)
      .subscribe(recipe => {
        this.recipes.push(recipe);
      });
  }

  deleteRecipe(delRecipe) {
    this.recipesService.deleteRecipe(delRecipe._id)
      .subscribe((recipe) => {
        this.recipes.splice(this.recipes.indexOf(recipe),1);
      });
    // no active recipe anymore
    this.activeRecipe = false;
  }

  onActiveDetails(active: boolean) {
    this.activeRecipe = active;
  }
}
