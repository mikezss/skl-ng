import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowtemplateComponent } from './flowtemplate.component';

describe('FlowtemplateComponent', () => {
  let component: FlowtemplateComponent;
  let fixture: ComponentFixture<FlowtemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowtemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
