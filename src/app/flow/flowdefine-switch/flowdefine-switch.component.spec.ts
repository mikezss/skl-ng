import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowdefineSwitchComponent } from './flowdefine-switch.component';

describe('FlowdefineSwitchComponent', () => {
  let component: FlowdefineSwitchComponent;
  let fixture: ComponentFixture<FlowdefineSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowdefineSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowdefineSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
