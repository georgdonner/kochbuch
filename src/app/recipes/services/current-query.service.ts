import { Injectable } from '@angular/core';

@Injectable()
export class CurrentQueryService {

  query = {
    ingrQuery: '',
    ctgQuery: '',
    titleQuery: '',
    sortDesc: true,
    sortQuery: 'cook-counter'
  }

  constructor() { }

  setQuery(ingr: string, ctg: string, title: string, desc: boolean, sortby: string) {
    this.query = {
      ingrQuery: ingr, 
      ctgQuery: ctg,
      titleQuery: title,
      sortDesc: desc,
      sortQuery: sortby
    };
  }

  getQuery() {
    return this.query;
  }

}
