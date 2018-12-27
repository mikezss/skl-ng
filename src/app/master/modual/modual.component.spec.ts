import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModualComponent } from './modual.component';

describe('ModualComponent', () => {
  let component: ModualComponent;
  let fixture: ComponentFixture<ModualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
