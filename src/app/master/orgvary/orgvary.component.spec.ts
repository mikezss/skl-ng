import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgvaryComponent } from './orgvary.component';

describe('OrgvaryComponent', () => {
  let component: OrgvaryComponent;
  let fixture: ComponentFixture<OrgvaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgvaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgvaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
