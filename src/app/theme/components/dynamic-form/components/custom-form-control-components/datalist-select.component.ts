import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';



@Component({
	selector: 'datalist-select',
	template: `
		<input [id]="question.key+'datalist'" type="text" [attr.list]="question.key" (blur)="selectValue(question.key, question.key+'datalist')"/>
		<datalist [id]="question.key">
			<option *ngFor="let opt of question.options" [value]="opt.key" >
				{{opt.value}}
			</option>
		</datalist>
	`,
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatalistSelectComponent), multi: true },
	]
})
export class DatalistSelectComponent implements ControlValueAccessor {

	propagateChange:any = () => {};
  
	@Input('datalistSelectValue') _datalistSelectValue = 'Select';
	@Input() question;
	@Input() form: FormGroup;

	get datalistSelectValue() {
		return this._datalistSelectValue;
	}
  
	set datalistSelectValue(val) {
		this._datalistSelectValue = val;
		this.propagateChange(val);
	}

	writeValue(value) {
		if (value) {
			this.datalistSelectValue = value;
		}
	}

	registerOnChange(fn) {
		this.propagateChange = fn;
	}

	registerOnTouched(fn) {
		this.propagateChange = fn;  		
	}

	selectValue(questionId, datalist) {
		if (questionId) {
			const inputSelector = document.getElementById(datalist);
			if(inputSelector){
				this.datalistSelectValue = inputSelector.value;
				this.form.patchValue({ [questionId]: this.datalistSelectValue });
				this.propagateChange(this.datalistSelectValue);				
			}
		}
	}


}