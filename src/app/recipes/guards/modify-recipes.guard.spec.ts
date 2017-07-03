import { TestBed, async, inject } from '@angular/core/testing';

import { ModifyRecipesGuard } from './modify-recipes.guard';

describe('ModifyRecipesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModifyRecipesGuard]
    });
  });

  it('should ...', inject([ModifyRecipesGuard], (guard: ModifyRecipesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
