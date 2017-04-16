import { Component, Input } from '@angular/core';
import { Recipe } from "../recipe";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {

  @Input() recipe: Recipe;

  constructor() { }

}
