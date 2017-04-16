import { Ingredient } from "./ingredient";

export class Recipe {

    constructor(
      public title: string,
      public duration: number,
      public difficulty: number,
      public ingredients: Array<Ingredient>,
      public description: string
    ) {  }
}
