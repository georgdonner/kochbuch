import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../../recipe';
import { RecipeService } from '../../services/recipe.service';
import { WunderlistService } from '../../services/wunderlist.service';
import { CurrentQueryService } from '../../services/current-query.service';

@Component({
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{

  selectedRecipe: Recipe;
  recipes: Recipe[];

  ingrQuery = '';
  ctgQuery = '';
  titleQuery = '';

  sortQuery = 'cook-counter';
  sortDesc = true;

  code: string;
  accessToken: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private wunderlistService: WunderlistService,
    private queryService: CurrentQueryService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        this.code = params['code'];
      }
    });
    // retrieve recipes from the API
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.getQuery();
    });
  }
  
  ngAfterContentInit() {
    if (this.code) {
      this.wunderlistService.getAccessToken(this.code).subscribe((token) => {
        this.accessToken = token;
      });
    }
  }

  getQuery() {
    this.ingrQuery = this.queryService.getQuery().ingrQuery;
    this.ctgQuery = this.queryService.getQuery().ctgQuery;
    this.titleQuery = this.queryService.getQuery().titleQuery;
    this.sortDesc = this.queryService.getQuery().sortDesc;
    this.sortQuery = this.queryService.getQuery().sortQuery;
  }

  sort(sort: string) {
    if (sort == 'asc') {
      this.sortDesc = false;
    } else {
      this.sortDesc = true;
    }
  }

  sortBy(sortby: string) {
    this.sortQuery = sortby;
  }

  onSelect(recipe: Recipe) {
    this.queryService.setQuery(this.ingrQuery, this.ctgQuery, this.titleQuery, this.sortDesc, this.sortQuery);
    this.router.navigate(['/recipe', recipe._id]);
  }

  newRecipe() {
    this.router.navigate(['/recipes/new']);
  }

}
