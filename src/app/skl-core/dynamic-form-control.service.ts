import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {DynamicFormBase} from './dynamic-form-base';

@Injectable()
export class DynamicFormControlService {

  constructor() {
  }

  toFormGroup(questions: DynamicFormBase<any>[]) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

}
