import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from "../recipe";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {

  @Input()
  recipe: Recipe;

  @Output()
  activeDetails: EventEmitter<boolean> = new EventEmitter();

  fullDetails: boolean;

  constructor() { }

  toggleFullDetails() {
    this.fullDetails = !this.fullDetails;
    this.activeDetails.emit(this.fullDetails);
  }

}
