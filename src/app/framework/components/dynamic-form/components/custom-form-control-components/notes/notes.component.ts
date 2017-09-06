import { Component, OnInit, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// override p with div tag
import * as Quill from 'quill';
const Parchment = Quill.import('parchment');
let Block = Parchment.query('block');

Block.tagName = 'DIV';
// or class NewBlock extends Block {}; NewBlock.tagName = 'DIV';
Quill.register(Block /* or NewBlock */, true);


@Component({
	selector: 'dc-notes',
	styleUrls: [ './notes.component.scss' ],
	templateUrl: './notes.component.html',
	encapsulation: ViewEncapsulation.None,
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NotesComponent), multi: true },
	]
})
export class NotesComponent implements ControlValueAccessor, OnInit {

	
	@Input() question;
	@Input() form: FormGroup;
	@Input() readonly;
	_value = '';

	toolbarOptions = [
	  	['bold', 'italic'],        // toggled buttons

	  	[{ 'list': 'ordered'}, { 'list': 'bullet' }],

	  	[{ 'size': [] }],  // custom dropdown

	  	[{ 'color': [] }],          // dropdown with defaults from theme
		['image']
	];

	onChange: any = () => { };
	onTouched: any = () => { };
	title = '';

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

		//revisit when we get backend complete - need to save both images and the sketch
		this.value = this.question.value 
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

	logChange($event: any) {
		this.value = $event.html 
		this.form.patchValue({[this.question.key]: this.value});
	}

	logSelection($event: any) {
		console.log($event);
	}

}