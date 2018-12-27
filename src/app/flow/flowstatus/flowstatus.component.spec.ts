import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowstatusComponent } from './flowstatus.component';

describe('FlowstatusComponent', () => {
  let component: FlowstatusComponent;
  let fixture: ComponentFixture<FlowstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
