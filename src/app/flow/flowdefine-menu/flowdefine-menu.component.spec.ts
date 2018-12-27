import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowdefineMenuComponent } from './flowdefine-menu.component';

describe('FlowdefineMenuComponent', () => {
  let component: FlowdefineMenuComponent;
  let fixture: ComponentFixture<FlowdefineMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowdefineMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowdefineMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
