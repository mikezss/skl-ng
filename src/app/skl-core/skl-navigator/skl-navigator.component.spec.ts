import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SklNavigatorComponent } from './skl-navigator.component';

describe('SklNavigatorComponent', () => {
  let component: SklNavigatorComponent;
  let fixture: ComponentFixture<SklNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SklNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SklNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
