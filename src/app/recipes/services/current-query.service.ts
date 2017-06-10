import { Injectable } from '@angular/core';

@Injectable()
export class CurrentQueryService {

  query = {
    filterQuery: '',
    sortDesc: true,
    sortQuery: 'date'
  };

  constructor() { }

  setQuery(filter: string, desc: boolean, sortby: string) {
    this.query = {
      filterQuery: filter,
      sortDesc: desc,
      sortQuery: sortby
    };
  }

  getQuery() {
    return this.query;
  }

}
