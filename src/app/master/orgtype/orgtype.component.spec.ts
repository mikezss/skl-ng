import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgtypeComponent } from './orgtype.component';

describe('OrgtypeComponent', () => {
  let component: OrgtypeComponent;
  let fixture: ComponentFixture<OrgtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
