import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from "../recipe";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  fullDetails: boolean;

  @Input()
  recipes: Recipe[];

  @Output()
  add: EventEmitter<Recipe> = new EventEmitter();

  @Output()
  activeDetails: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  toggleFullDetails() {
    this.fullDetails = !this.fullDetails;
    this.activeDetails.emit(this.fullDetails);
  }
}
