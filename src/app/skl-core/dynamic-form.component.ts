import {Component, OnInit, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DynamicFormBase} from './dynamic-form-base';
import {DynamicFormControlService} from './dynamic-form-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [DynamicFormControlService]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: DynamicFormBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: DynamicFormControlService) {
  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }

}
