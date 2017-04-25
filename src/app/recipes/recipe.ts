export class Recipe {

    constructor(
      public title: string,
      public servings: number,
      public duration: number,
      public difficulty: number,
      public cookCount: number,
      public ingredients: Array<Ingredient>,
      public heroImage?: string,
      public description?: string,
      public descrImage?: string,
      public categories?: Array<string>,
      public _id?: string
    ) {  }
}

export class Ingredient {
  
    constructor(
        public name: string,
        public hint: string
    ) {}
}
