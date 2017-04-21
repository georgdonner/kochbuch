import { FilterRecipesPipe } from './filter-recipes.pipe';

describe('FilterRecipesPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterRecipesPipe();
    expect(pipe).toBeTruthy();
  });
});
