import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SklBreadcrumbComponent } from './skl-breadcrumb.component';

describe('SklBreadcrumbComponent', () => {
  let component: SklBreadcrumbComponent;
  let fixture: ComponentFixture<SklBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SklBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SklBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
