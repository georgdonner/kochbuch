import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { MzModalService } from 'ng2-materialize';

import { Recipe } from '../../recipe';
import { ConverterComponent } from '../converter/converter.component';
import { RecipeService } from '../../services/recipe.service';
import { CurrentQueryService } from '../../services/current-query.service';
import { ZauberwortService } from '../../services/zauberwort.service';

@Component({
  templateUrl: './recipe-details.component.html',
  styleUrls: [
    './recipe-details.component.css',
    '../recipe-form/recipe-form.component.css'
  ]
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  desiredServings: number;

  lightbox = false;
  descrImageRatio: number;
  Arr = Array;

  constructor(
    private recipeService: RecipeService,
    private queryService: CurrentQueryService,
    private zauberwortService: ZauberwortService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: MzModalService
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.recipeService.getRecipe(params['id']))
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
        this.desiredServings = recipe.servings;
    });
  }

  gotoRecipes() {
    this.router.navigate(['/recipes'], {fragment: this.recipe._id});
  }

  searchCtg(ctg: string) {
    this.queryService.setQuery(ctg, true, 'date');
    this.gotoRecipes();
  }

  cooked() {
    ++this.recipe.cookCount;
    this.recipeService.updateRecipe(this.recipe)
      .subscribe();
  }

  edit() {
    this.router.navigate(['/recipe', this.recipe._id, 'edit']);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe._id)
      .subscribe();
  }

  addServing() {
    this.desiredServings++;
  }

  removeServing() {
    if (this.desiredServings > 1) {
      this.desiredServings--;
    }
  }

  public converter() {
    this.modalService.open(ConverterComponent);
  }

  printView() {
    this.router.navigate(['/recipe', this.recipe._id, 'print']);
  }

  randomString (length, chars) {
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  isLoggedIn() {
    return this.zauberwortService.canModify();
  }

  lightboxOn() {
    this.lightbox = true;
  }

  lightboxOff() {
    this.lightbox = false;
  }

}
