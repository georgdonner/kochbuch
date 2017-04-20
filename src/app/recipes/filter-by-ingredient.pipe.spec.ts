import { FilterByIngredientPipe } from './filter-by-ingredient.pipe';

describe('FilterByIngredientPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByIngredientPipe();
    expect(pipe).toBeTruthy();
  });
});
