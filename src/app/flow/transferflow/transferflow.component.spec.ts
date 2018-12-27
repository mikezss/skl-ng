import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferflowComponent } from './transferflow.component';

describe('TransferflowComponent', () => {
  let component: TransferflowComponent;
  let fixture: ComponentFixture<TransferflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
