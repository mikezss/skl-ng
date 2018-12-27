import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DynamicFormBase} from './dynamic-form-base';

@Component({
  selector: 'app-dynamic-form-item',
  templateUrl: './dynamic-form-item.component.html',
  styleUrls: ['./dynamic-form-item.component.css']
})
export class DynamicFormItemComponent implements OnInit {
  @Input() question: DynamicFormBase<any>;
  @Input() form: FormGroup;

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
