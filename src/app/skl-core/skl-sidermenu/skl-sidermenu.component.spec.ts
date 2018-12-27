import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SklSidermenuComponent } from './skl-sidermenu.component';

describe('SklSidermenuComponent', () => {
  let component: SklSidermenuComponent;
  let fixture: ComponentFixture<SklSidermenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SklSidermenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SklSidermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
