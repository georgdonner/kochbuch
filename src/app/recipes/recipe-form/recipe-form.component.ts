import { Component, Output, EventEmitter } from '@angular/core';
import { Http } from "@angular/http";
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import 'rxjs/add/operator/map';

import { Recipe } from "../recipe";
import { Ingredient } from "../ingredient";

const URL = 'https://www.filestackapi.com/api/store/S3?key=AwD48ceQaWtGBs9plMog7z';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {

  public uploader: FileUploader;

  ingredients = new Array<Ingredient>();
  newIngredient = new Ingredient('', '');
  model = new Recipe('', 0, 0, this.ingredients, '', '');

  @Output()
  add: EventEmitter<Recipe> = new EventEmitter();

  constructor() {
    this.uploader = new FileUploader({url: URL, disableMultipart: true});
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.model.image = JSON.parse(response).url;
    };
  }

  addRecipe(recipe: Recipe) {
    this.add.emit(recipe);
  }

  addIngredient() {
    if (this.newIngredient) {
        const ingr = this.newIngredient;

        this.ingredients.push(ingr);
        this.newIngredient = new Ingredient('', '');
      }
  }

}
