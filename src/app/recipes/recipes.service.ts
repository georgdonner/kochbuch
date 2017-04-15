import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class RecipesService {

  constructor(private http: Http) { }

  // Get all recipes from the API
  getAllRecipes() {
    return this.http.get('api/recipes')
      .map(res => res.json());
  }

  addRecipe(newRecipe) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/recipe', JSON.stringify(newRecipe), {headers: headers})
      .map(res => res.json());
  }

}
