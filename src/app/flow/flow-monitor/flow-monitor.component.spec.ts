import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowMonitorComponent } from './flow-monitor.component';

describe('FlowMonitorComponent', () => {
  let component: FlowMonitorComponent;
  let fixture: ComponentFixture<FlowMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
