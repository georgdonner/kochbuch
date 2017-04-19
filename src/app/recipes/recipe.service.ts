import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Recipe } from './recipe';

@Injectable()
export class RecipeService {

  constructor(private http: Http) { }

  // Get all recipes from the API
  getAllRecipes() {
    return this.http.get('api/recipes')
      .map(res => res.json());
  }

  getRecipe(recipeId) {
    return this.http.get('api/recipe/' + recipeId)
      .map(res => res.json());
  }

  addRecipe(newRecipe) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('api/recipe', JSON.stringify(newRecipe), {headers: headers})
      .map(res => res.json());
  }

  deleteRecipe(recipeId) {
    return this.http.delete('api/recipe/' + recipeId)
      .map(res => res.json());
  }

}
