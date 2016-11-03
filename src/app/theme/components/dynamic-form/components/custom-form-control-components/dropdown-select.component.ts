import { Component, OnInit, forwardRef, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';


export function createRangeValidator(maxValue, minValue) {
	return (c: FormControl) => {
		let err = {
			rangeError: {
				given: c.value,
				max: maxValue || 10,
				min: minValue || 0
			}
		};

		return (c.value > +maxValue || c.value < +minValue) ? err: null;
	}
}

@Component({
	selector: 'dropdown-select',
	template: `
		<div ngbDropdown class="form-control">
			<div class="btn btn-outline-primary" [id]="question.key" ngbDropdownToggle>{{ dropdownSelectValue || question.placeholder }}</div>
			<div class="dropdown-menu" aria-labelledby="question.key">
				<div class="dropdown-item" *ngFor="let opt of question.options" (click)=selectValue(opt.value)>{{ opt.value }}</div>
			</div>
		</div>
	`,
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DropdownSelectComponent), multi: true },
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => DropdownSelectComponent), multi: true }
	]
})
export class DropdownSelectComponent implements ControlValueAccessor, OnChanges, OnInit {

	propagateChange:any = () => {};
	validateFn:any = () => {};
  
	@Input('dropdownSelectValue') _dropdownSelectValue = '';
	@Input() question;
	@Input() counterRangeMax;
	@Input() counterRangeMin;
	@Input() form: FormGroup;

	get dropdownSelectValue() {
		return this._dropdownSelectValue;
	}
  
	set dropdownSelectValue(val) {
		this._dropdownSelectValue = val;
		this.propagateChange(val);
	}

	ngOnInit(){
		if(this.question.value){
			this.dropdownSelectValue = this.question.value;
			this.form.patchValue({[this.question.key]: this.dropdownSelectValue});
			this.propagateChange(this.dropdownSelectValue);
			
		}
	}

	ngOnChanges(inputs) {
		if (inputs.counterRangeMax || inputs.counterRangeMin) {
			this.validateFn = createRangeValidator(this.counterRangeMax, this.counterRangeMin);
		}
	}

	writeValue(value) {
		if (value) {
			this.dropdownSelectValue = value;
		}
	}

	registerOnChange(fn) {
		this.propagateChange = fn;
	}

	registerOnTouched(fn) {
		this.propagateChange = fn;  		
	}


	validate(c: FormControl) {
		return this.validateFn(c);
	}
	selectValue(value) {
		if (value) {
			this.dropdownSelectValue = value;
			this.form.patchValue({[this.question.key]: value});
			this.propagateChange(this.dropdownSelectValue);
		}
	}


}