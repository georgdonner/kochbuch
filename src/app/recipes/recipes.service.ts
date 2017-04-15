import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class RecipesService {

  constructor(private http: Http) { }

  // Get all recipes from the API
  getAllRecipes() {
    return this.http.get('api/recipes')
      .map(res => res.json());
  }

}
