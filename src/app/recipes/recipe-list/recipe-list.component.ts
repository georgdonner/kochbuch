import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from "../recipe";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  activeRecipes = 0;

  @Input()
  recipes: Recipe[];
  activeDetails: boolean;

  @Output()
  add: EventEmitter<Recipe> = new EventEmitter();

  @Output()
  isActiveDetails: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  onActiveDetails(active: boolean) {
    if (active) {
      this.activeRecipes++;
    } else {
      this.activeRecipes--;
    }
    console.log(this.activeRecipes);
    if (this.activeRecipes > 0) {
      this.isActiveDetails.emit(true);
    } else {
      this.isActiveDetails.emit(false);
    }
  }

}
