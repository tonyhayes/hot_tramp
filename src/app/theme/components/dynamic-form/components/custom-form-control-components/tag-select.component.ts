import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';



@Component({
	selector: 'tag-select',
	template: `
		<ng-select (data)="value"
          [multiple]="true"
          [items]="items"
          [disabled]="disabled"
          (data)="refreshValue($event)"
          (selected)="selected($event)"
          (removed)="removed($event)"
          placeholder="Select...">              	
        </ng-select>
	`,
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TagSelectComponent), multi: true },
	]
})
export class TagSelectComponent implements ControlValueAccessor, OnInit {

	propagateChange:any = () => {};
  
	@Input('listSelectValue') _listSelectValue = 'Select';
	@Input() question;
	@Input() form: FormGroup;
	private items: any [];
  	private _disabledV:string = '0';
  	private disabled:boolean = false;

	get listSelectValue() {
		return this._listSelectValue;
	}
  
	set listSelectValue(val) {
		this._listSelectValue = val;
		this.propagateChange(val);
	}

	public ngOnInit():void {
		this.items = this.question.options.map( option => ({'id': option.key, 'text': option.value}))
	}

	writeValue(value) {
		if (value) {
			this.listSelectValue = value;
		}
	}

	registerOnChange(fn) {
		this.propagateChange = fn;
	}

	registerOnTouched(fn) {
		this.propagateChange = fn;  		
	}


  	private get disabledV():string {
    	return this._disabledV;
  	}

  	private set disabledV(value:string) {
    	this._disabledV = value;
    	this.disabled = this._disabledV === '1';
  	}

  	private selected(value:any):void {
    	console.log('Selected value is: ', value);
  	}

  	private removed(value:any):void {
    	console.log('Removed value is: ', value);
  	}

  	private refreshValue(value:any):void {
		this.form.patchValue({ [this.question.key]: value.map(val=> val.id) });
		this.propagateChange(value);
  	}


}