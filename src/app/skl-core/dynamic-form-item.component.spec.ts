import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormItemComponent } from './dynamic-form-item.component';

describe('DynamicFormItemComponent', () => {
  let component: DynamicFormItemComponent;
  let fixture: ComponentFixture<DynamicFormItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
