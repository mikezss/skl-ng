import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SklFormComponent } from './skl-form.component';

describe('SklFormComponent', () => {
  let component: SklFormComponent;
  let fixture: ComponentFixture<SklFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SklFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SklFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
