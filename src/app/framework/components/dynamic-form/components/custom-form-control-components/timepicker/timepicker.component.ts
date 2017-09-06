import { Component, OnInit, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';



@Component({
	selector: 'dc-timepicker',
	styleUrls: [ './timepicker.component.scss' ],
	template: `
		<input class="picker-input"  [ngModel]="value | date: 'short'" [dateTimePicker]="value" (dateTimePickerChange)="saveValue($event)" readonly />
	`,
//	encapsulation: ViewEncapsulation.None,
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimepickerComponent), multi: true },
	]
})
export class TimepickerComponent implements ControlValueAccessor {
	change = (_: any) => {};
	@Input() question;
	@Input() form: FormGroup;
	@Input() readonly;
	_value = null;

	onChange: any = () => { };
	onTouched: any = () => { };

	get value() {
		return this._value;
	}

	set value(val) {
		this._value = val;
		this.onChange(val);
		this.onTouched();
	}

	constructor() { }
	ngOnInit():void {
		this.form.patchValue({[this.question.key]: this.value});
	}

	registerOnChange(fn) {
		this.onChange = fn;
	}

	writeValue(value) {
		console.log(value);
		if (value) {
				this.value = value;
		}
	}

	registerOnTouched(fn) { 
		this.onTouched = fn;
	}

	saveValue(value) {
		if(!value){
			return
		}
	 	this.value = value;
		this.form.patchValue({ [this.question.key]: this.value });
	}	
}