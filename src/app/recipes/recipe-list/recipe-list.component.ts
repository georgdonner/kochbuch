import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from "../recipe";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  selectedRecipe: Recipe;

  @Input()
  recipes: Recipe[];

  @Output()
  delete: EventEmitter<Recipe> = new EventEmitter();

  @Output()
  isActiveDetails: EventEmitter<boolean> = new EventEmitter();

  activeRecipe: boolean;

  constructor() {
  }

  onActiveRecipe(recipe: Recipe) {
    if (recipe != null) {
      this.selectedRecipe = recipe;
      this.activeRecipe = true;
    } else {
      this.activeRecipe = false;
    }
    this.isActiveDetails.emit(this.activeRecipe);
  }

  deleteRecipe(recipe: Recipe) {
    this.delete.emit(recipe);
  }

}
