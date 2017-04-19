import { Ingredient } from './ingredient';

export class Recipe {

    constructor(
      public title: string,
      public duration: number,
      public difficulty: number,
      public ingredients: Array<Ingredient>,
      public description?: string,
      public descrImage?: string,
      public categories?: Array<string>,
      public _id?: string
    ) {  }
}
