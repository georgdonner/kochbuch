import { TestBed, inject } from '@angular/core/testing';

import { CurrentQueryService } from './current-query.service';

describe('CurrentQueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentQueryService]
    });
  });

  it('should ...', inject([CurrentQueryService], (service: CurrentQueryService) => {
    expect(service).toBeTruthy();
  }));
});
