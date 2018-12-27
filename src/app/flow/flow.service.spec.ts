import { TestBed, inject } from '@angular/core/testing';

import { FlowService } from './flow.service';

describe('FlowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlowService]
    });
  });

  it('should be created', inject([FlowService], (service: FlowService) => {
    expect(service).toBeTruthy();
  }));
});
