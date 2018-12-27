import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowdefineComponent } from './flowdefine.component';

describe('FlowdefineComponent', () => {
  let component: FlowdefineComponent;
  let fixture: ComponentFixture<FlowdefineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowdefineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowdefineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
