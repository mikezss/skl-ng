import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneTraceComponent } from './done-trace.component';

describe('DoneTraceComponent', () => {
  let component: DoneTraceComponent;
  let fixture: ComponentFixture<DoneTraceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoneTraceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneTraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
