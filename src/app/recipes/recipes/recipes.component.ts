import { Component, OnInit } from '@angular/core';
import { Recipe } from "../recipe";
import { RecipesService } from "../recipes.service";
import { Ingredient } from "../../ingredient";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  // instantiate recipes to an empty array
  recipes: Recipe[];
  title: string;
  duration: number;
  difficulty: number;
  ingredients: Ingredient[];
  newIngredient: Ingredient;
  description: string;

  constructor(private recipesService: RecipesService) {
    this.ingredients = new Array<Ingredient>();
    this.newIngredient = new Ingredient();
  }

  ngOnInit() {
    // retrieve recipes from the API
    this.recipesService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  addRecipe(event){
    event.preventDefault();
    var newRecipe = {
      title: this.title,
      duration: this.duration,
      difficulty: this.difficulty,
      ingredients: this.ingredients,
      description: this.description
    }

    this.recipesService.addRecipe(newRecipe)
      .subscribe(recipe => {
        this.recipes.push(recipe);
      })
  }

  addIngredient() {
        if (this.newIngredient) {

            var entry = {
                'name': this.newIngredient.name,
                'quantity': this.newIngredient.quantity
            };

            this.ingredients.push(entry);
            this.newIngredient.name = '';
            this.newIngredient.quantity = '';
        }
    }

}
