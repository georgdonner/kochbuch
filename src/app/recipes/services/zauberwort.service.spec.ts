import { TestBed, inject } from '@angular/core/testing';

import { ZauberwortService } from './zauberwort.service';

describe('ZauberwortService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZauberwortService]
    });
  });

  it('should ...', inject([ZauberwortService], (service: ZauberwortService) => {
    expect(service).toBeTruthy();
  }));
});
