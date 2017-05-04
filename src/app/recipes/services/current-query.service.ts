import { Injectable } from '@angular/core';

@Injectable()
export class CurrentQueryService {

  query = {
    ingrQuery: '',
    ctgQuery: '',
    titleQuery: ''
  }

  constructor() { }

  setQuery(ingr: string, ctg: string, title: string) {
    this.query = {
      ingrQuery: ingr, 
      ctgQuery: ctg,
      titleQuery: title
    };
  }

  getQuery() {
    return this.query;
  }

}
