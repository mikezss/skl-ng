import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SklPortalComponent } from './skl-portal.component';

describe('SklPortalComponent', () => {
  let component: SklPortalComponent;
  let fixture: ComponentFixture<SklPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SklPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SklPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
