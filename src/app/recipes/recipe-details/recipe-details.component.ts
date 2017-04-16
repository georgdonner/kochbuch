import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from "../recipe";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  @Input()
  recipe: Recipe;

  @Input()
  active: boolean;

  @Output()
  activeRecipe: EventEmitter<Recipe> = new EventEmitter();

  fullDetails: boolean;

  constructor() { }

  ngOnInit() {
    this.fullDetails = this.active;
  }

  toggleFullDetails() {
    this.fullDetails = !this.fullDetails;
    if (this.fullDetails) {
      this.activeRecipe.emit(this.recipe);
    } else {
      this.activeRecipe.emit(null);
    }
  }

}
