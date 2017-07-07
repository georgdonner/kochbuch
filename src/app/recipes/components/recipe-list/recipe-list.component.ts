import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MzToastService } from 'ng2-materialize';

import { Recipe } from '../../recipe';
import { ZauberwortService } from '../../services/zauberwort.service';
import { RecipeService } from '../../services/recipe.service';
import { CurrentQueryService } from '../../services/current-query.service';
import { ScrollService } from '../../services/scroll.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

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

  searching: Subject<string> = new Subject<string>();
  scrolled = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private queryService: CurrentQueryService,
    private scrollService: ScrollService,
    private zauberwortService: ZauberwortService,
    private toastService: MzToastService
  ) {
    this.searching
      .debounceTime(2000) // wait 2000ms after the last event before emitting last event
      .distinctUntilChanged() // only emit if value is different from previous value
      .subscribe(() => this.scrollDown());
  }

  ngOnInit() {
    // retrieve recipes from the API
    this.getQuery();
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.scrolled = false;
      this.recipes = recipes;
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

  changed() {
    this.searching.next(); // starts subject observing
  }

  scrollDown(delay = false) {
    if (delay) {
      setTimeout(function() {
        const yPos = window.pageYOffset;
        if (yPos === 0) {
          window.scrollTo(0, 100);
        } else {
          window.scrollTo(0, yPos + 1);
        }
      }, 3000);
    } else {
      const yPos = window.pageYOffset;
      if (yPos === 0) {
        window.scrollTo(0, 100);
      } else {
        window.scrollTo(0, yPos + 1);
      }
    }
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
