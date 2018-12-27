import {DynamicFormBase} from './dynamic-form-base';

export class DynamicFormTextbox extends DynamicFormBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
