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

  addRecipe(newRecipe): Observable<Recipe> {
    console.log(JSON.stringify(newRecipe));
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('api/recipe', JSON.stringify(newRecipe), {headers: headers})
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  deleteRecipe(recipeId) {
    return this.http.delete('api/recipe/' + recipeId)
      .map(res => res.json());
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
