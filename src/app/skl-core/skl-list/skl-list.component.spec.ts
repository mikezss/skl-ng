import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SklListComponent } from './skl-list.component';

describe('SklListComponent', () => {
  let component: SklListComponent;
  let fixture: ComponentFixture<SklListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SklListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SklListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
