import { Component, OnInit, forwardRef, Input, ChangeDetectorRef, Renderer } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'dropdown-select',
	template: `
		<div 
			ngbDropdown keyboard-nav 
			class="form-control" 
			[ngClass]="{'focus-in' : focusIn}"
			>
			<button 
				class="btn btn-outline-primary" 
				[id]="question.key" ngbDropdownToggle
				type="button"
			>
				{{ dropdownSelectValueWithKey || question.placeholder }}
			</button>
			<div class="dropdown-menu" aria-labelledby="question.key">
				<div class="dropdown-item" *ngFor="let opt of question.options" (click)=selectValue(opt)>{{ opt.key }}: {{ opt.value }}</div>
			</div>
		</div>
	`,
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DropdownSelectComponent), multi: true },
	]
})
export class DropdownSelectComponent implements ControlValueAccessor, OnInit {

	propagateChange:any = () => {};
	validateFn:any = () => {};
	checked = 0;
	focusIn = false;
	dropdownSelectValueWithKey;
  
	@Input('dropdownSelectValue') _dropdownSelectValue = '';
	@Input() question;
	@Input() form: FormGroup;

	constructor(private cdRef:ChangeDetectorRef, private renderer: Renderer) {  }

	get dropdownSelectValue() {
		return this._dropdownSelectValue;
	}
  
	set dropdownSelectValue(val) {
		this._dropdownSelectValue = val;
		this.propagateChange(val);
	}

	ngOnInit(){
		if(this.question.value){
			this.dropdownSelectValueWithKey = `${this.question.key}: ${this.question.value}`;
			this.dropdownSelectValue = this.question.value;
			this.form.patchValue({[this.question.key]: this.dropdownSelectValue});
			this.propagateChange(this.dropdownSelectValue);
			
		}
	}

	ngAfterViewChecked(){
		if( this.checked < 3 && this.question.order == 1){
			document.getElementById(this.question.key).focus();
			this.checked++;		
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

	selectValue(option) {
		if (option) {
			this.dropdownSelectValueWithKey = `${option.key}: ${option.value}`;
			this.dropdownSelectValue = option.value;
			this.form.patchValue({[this.question.key]: option.key});
			this.propagateChange(this.dropdownSelectValue);
		}
	}


}