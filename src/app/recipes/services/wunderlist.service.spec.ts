import { TestBed, inject } from '@angular/core/testing';

import { WunderlistService } from './wunderlist.service';

describe('WunderlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WunderlistService]
    });
  });

  it('should ...', inject([WunderlistService], (service: WunderlistService) => {
    expect(service).toBeTruthy();
  }));
});
