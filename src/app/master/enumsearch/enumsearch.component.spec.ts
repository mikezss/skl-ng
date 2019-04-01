import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumsearchComponent } from './enumsearch.component';

describe('EnumsearchComponent', () => {
  let component: EnumsearchComponent;
  let fixture: ComponentFixture<EnumsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
