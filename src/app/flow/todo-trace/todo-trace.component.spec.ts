import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTraceComponent } from './todo-trace.component';

describe('TodoTraceComponent', () => {
  let component: TodoTraceComponent;
  let fixture: ComponentFixture<TodoTraceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoTraceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoTraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
