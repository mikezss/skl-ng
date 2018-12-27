import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowdefineManComponent } from './flowdefine-man.component';

describe('FlowdefineManComponent', () => {
  let component: FlowdefineManComponent;
  let fixture: ComponentFixture<FlowdefineManComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowdefineManComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowdefineManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
