import { Injectable } from '@angular/core';

@Injectable()
export class ScrollService {
  scrollPos = 0;

  constructor() { }

  setScrollPos(pos: number) {
    this.scrollPos = pos;
  }

  getScrollPos(): number {
    return this.scrollPos;
  }

}
