import { Component, OnInit } from '@angular/core';
import { RecipesService } from "../recipes.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  // instantiate recipes to an empty array
  recipes: any = []

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    // retrieve recipes from the API
    this.recipesService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

}
