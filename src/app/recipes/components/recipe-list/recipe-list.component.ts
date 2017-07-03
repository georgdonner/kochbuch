import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MzToastService } from 'ng2-materialize';

import { Recipe } from '../../recipe';
import { ZauberwortService } from '../../services/zauberwort.service';
import { RecipeService } from '../../services/recipe.service';
import { CurrentQueryService } from '../../services/current-query.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, AfterViewChecked {

  selectedRecipe: Recipe;
  recipes: Recipe[];

  query = '';
  vegetarian = false;
  vegan = false;

  sortQuery = 'date';
  sortDesc = true;

  code: string;

  scrolled = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private queryService: CurrentQueryService,
    private scrollService: ScrollService,
    private zauberwortService: ZauberwortService,
    private toastService: MzToastService
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
      this.scrolled = false;
    });
  }

  ngAfterViewChecked() {
    if (!this.scrolled) {
      let yPos = this.scrollService.getScrollPos();
      window.scrollTo(0, yPos);
      this.scrolled = true;
    }
  }

  getQuery() {
    this.query = this.queryService.getQuery().filterQuery;
    this.sortDesc = this.queryService.getQuery().sortDesc;
    this.sortQuery = this.queryService.getQuery().sortQuery;
  }

  toggleCategory(ctg: string) {
    if (!this.query.includes(ctg)) {
      // the category is not present in the query
      if (this.query === '') {
        this.query = ctg;
      } else {
        this.query = this.query.concat(', ' + ctg);
      }
    } else {
      // category already present in query
      if (this.query.includes(',')) {
        // there are multiple categories in query
        if (this.query.endsWith(ctg)) {
          this.query = this.query.replace((', ' + ctg), '');
        } else {
          this.query = this.query.replace((ctg + ', '), '');
        }
      } else {
        this.query = '';
      }
    }
  }

  hasCategory(ctg: string) {
    return this.query.includes(ctg);
  }

  sort(sort: string) {
    if (sort === 'asc') {
      this.sortDesc = false;
    } else {
      this.sortDesc = true;
    }
  }

  sortBy(sortby: string) {
    this.sortQuery = sortby;
  }

  onSelect(recipe: Recipe) {
    this.scrollService.setScrollPos(window.pageYOffset);
    this.queryService.setQuery(this.query, this.sortDesc, this.sortQuery);
    this.router.navigate(['/recipe', recipe._id]);
  }

  newRecipe() {
    this.router.navigate(['/recipes/new']);
  }

  async login(zauberwort: string) {
    const successful = await this.zauberwortService.requestPermissions(zauberwort.trim().toLowerCase());
    if (successful) {
      this.toastService.show('Du hast das Zauberwort gesprochen!', 4000, 'green rounded');
    }
  }

  isLoggedIn() {
    return this.zauberwortService.canModify();
  }

}
