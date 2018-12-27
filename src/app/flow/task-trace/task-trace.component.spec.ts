import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTraceComponent } from './task-trace.component';

describe('TaskTraceComponent', () => {
  let component: TaskTraceComponent;
  let fixture: ComponentFixture<TaskTraceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskTraceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
