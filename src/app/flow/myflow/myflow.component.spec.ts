import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyflowComponent } from './myflow.component';

describe('MyflowComponent', () => {
  let component: MyflowComponent;
  let fixture: ComponentFixture<MyflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
