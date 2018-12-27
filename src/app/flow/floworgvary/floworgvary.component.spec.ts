import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloworgvaryComponent } from './floworgvary.component';

describe('FloworgvaryComponent', () => {
  let component: FloworgvaryComponent;
  let fixture: ComponentFixture<FloworgvaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloworgvaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloworgvaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
