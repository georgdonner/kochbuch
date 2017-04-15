import { Ingredient } from "../ingredient";

export class Recipe {
  title: string;
  duration: number;
  difficulty: number;
  ingredients: Ingredient[];
  description: string;
}
