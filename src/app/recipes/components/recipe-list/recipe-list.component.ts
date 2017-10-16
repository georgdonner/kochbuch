import { Component, OnInit, AfterViewChecked, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MzToastService } from 'ng2-materialize';

import { Recipe } from '../../recipe';
import { ZauberwortService } from '../../services/zauberwort.service';
import { RecipeService } from '../../services/recipe.service';
import { CurrentQueryService } from '../../services/current-query.service';
import { ScrollService } from '../../services/scroll.service';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, AfterViewChecked, OnDestroy {

  selectedRecipe: Recipe;
  recipes: Recipe[];

  query = '';
  vegetarian = false;
  vegan = false;

  sortQuery = 'date';
  sortDesc = true;

  searching: Subject<string> = new Subject<string>();
  searchObservable;
  scrolled = false;
  showScrollUp = false;

  routeFragmentSubscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private queryService: CurrentQueryService,
    private scrollService: ScrollService,
    private zauberwortService: ZauberwortService,
    private toastService: MzToastService
  ) {
    this.searchObservable = Observable.merge(Observable.fromEvent(window, 'scroll'), this.searching);
  }

  ngOnInit() {
    // retrieve recipes from the API
    this.getQuery();
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
    setTimeout(function () {
      history.replaceState(null, null, '/recipes');
  }, 2000);
  }

  ngAfterViewChecked() {
    this.routeFragmentSubscription = this.route.fragment
    .subscribe(fragment => {
      if (fragment) {
        let element = document.getElementById(fragment);
        if (fragment !== '' && element && !this.scrolled) {
          element.scrollIntoView();
          this.scrolled = true;
        }
      }
    });
  }

  ngOnDestroy() {
    this.routeFragmentSubscription.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    window.pageYOffset > 300 ? this.showScrollUp = true : this.showScrollUp = false;
  }

  getQuery() {
    this.query = this.queryService.getQuery().filterQuery;
    this.sortDesc = this.queryService.getQuery().sortDesc;
    this.sortQuery = this.queryService.getQuery().sortQuery;
  }

  changed() {
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.searching.next(); // starts subject observing
    }, 200);
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
    if (!this.isLoggedIn()) {
      const successful = await this.zauberwortService.requestPermissions(zauberwort.trim().toLowerCase());
      if (successful) {
        this.toastService.show('Du hast das Zauberwort gesprochen!', 4000, 'green rounded');
        this.query = '';
      }
    }
  }

  isLoggedIn(): boolean {
    return this.zauberwortService.canModify();
  }

}
