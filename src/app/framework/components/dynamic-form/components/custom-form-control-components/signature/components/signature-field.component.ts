import { Component, OnInit, forwardRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
	selector: 'signature-field',
	template: `
			<signature-pad [options]="options" (onBeginEvent)="drawBegin()" (onEndEvent)="drawComplete()"></signature-pad>
	`,
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SignatureFieldComponent), multi: true },
	]
})
export class SignatureFieldComponent implements ControlValueAccessor {

	@ViewChild(SignaturePad) public signaturePad: SignaturePad;
	@Input() question;
	@Input() form: FormGroup;
  	options: Object = {};
   	_signature: any = null;
 	propagateChange: any = () => { };

	constructor() { }
	get signature(): any {
		return this._signature;
  	}

  	set signature(value: any) {
		this._signature = value;
		console.log('set signature to ' + this._signature);
		this.propagateChange(this.signature);
  	}

   	writeValue(value: any): void {
		if (!value) {
	  		return;
		}
		this._signature = value;
		this.signaturePad.fromDataURL(this.signature);
  	}

   	registerOnChange(fn: any): void {
		this.propagateChange = fn;
  	}

   	registerOnTouched(): void {
		// no-op
  	}

  	ngAfterViewInit(): void {
		this.signaturePad.clear();
		if(this.question.value){
			this.signature = this.question.value 
			this.form.patchValue({[this.question.key]: this.signature});
			this.signaturePad.fromDataURL(this.signature)			
		}
  	}

   	drawBegin(): void {
		console.log('Begin Drawing');
  	}

   	drawComplete(): void {
		this.signature = this.signaturePad.toDataURL('image/png', 0.5);
		this.form.patchValue({ [this.question.key]: this.signature });
		this.question.dataURL = this.signature;
  	}

   	clear(): void {
		this.signaturePad.clear();
		this.signature = '';
  	}
}