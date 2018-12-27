import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceHeaderComponent } from './trace-header.component';

describe('TraceHeaderComponent', () => {
  let component: TraceHeaderComponent;
  let fixture: ComponentFixture<TraceHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraceHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
