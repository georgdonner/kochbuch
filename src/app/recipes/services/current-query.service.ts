import { Injectable } from '@angular/core';

@Injectable()
export class CurrentQueryService {

  query = {
    ingrQuery: '',
    ctgQuery: ''
  }

  constructor() { }

  setQuery(ingr: string, ctg: string) {
    this.query = {
      ingrQuery: ingr, 
      ctgQuery: ctg
    };
  }

  getQuery() {
    return this.query;
  }

}
