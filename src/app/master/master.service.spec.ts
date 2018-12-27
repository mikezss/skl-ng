import { TestBed, inject } from '@angular/core/testing';

import { MasterService } from './master.service';

describe('MasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MasterService]
    });
  });

  it('should be created', inject([MasterService], (service: MasterService) => {
    expect(service).toBeTruthy();
  }));
});
