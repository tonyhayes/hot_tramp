//import { ControlValueAccessor } from '@angular/forms';
import { QuestionBase } from '../model/question-base';

export class DatalistQuestion extends QuestionBase<string> /*implements ControlValueAccessor*/ {
	controlType = 'datalist';
	options: {key: string, value: string}[] = [];
//	propagateChange = (_: any) => {};

	constructor(options: {} = {}) {
		super(options);
		this.options = options['options'] || [];
	}
  	// writeValue(value: any) {
  	// 	if (value !== undefined) {
	  //   	this.options[0].value = value;
  	// 	}
  	// }
  	// registerOnChange(fn) {
   //  	this.propagateChange = fn;
  	// }

  	// registerOnTouched() {}

}
