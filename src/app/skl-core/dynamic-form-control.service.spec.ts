import { TestBed, inject } from '@angular/core/testing';

import { DynamicFormControlService } from './dynamic-form-control.service';

describe('DynamicFormControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicFormControlService]
    });
  });

  it('should be created', inject([DynamicFormControlService], (service: DynamicFormControlService) => {
    expect(service).toBeTruthy();
  }));
});
