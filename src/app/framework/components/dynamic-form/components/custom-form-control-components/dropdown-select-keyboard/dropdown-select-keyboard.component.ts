import { Component, OnInit, forwardRef, Input, ChangeDetectorRef, Renderer, ElementRef } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'dropdown-select-keyboard',
	template: `

	<div class="form-control"
	[class.focus-in]="focusIn"

	>
		<div 
			class="dropdown-input btn btn-default open-dropdown-button" 
			[id]="question.key"
			(click)="showAll(input)"
		>
			<input #input type="text" [(ngModel)]="query" (keyup)="filter($event)" (focus)="onFocus()" (blur)="onBlur()" readonly>
			{{ dropdownSelectValueWithKey || question.placeholder }}
		</div>

		<ul id="list-group" class="list-group group-list" *ngIf="filteredList.length > 0">
			<li *ngFor="let item of filteredList" [class.active]="item.selected" [id]="item.selected" class="list-group-item item-list" (click)="select(item)">
			  {{ item.key }}: {{ item.value }}
			</li>
		</ul>
	</div>

	`,
	styleUrls: ['./dropdown-select-keyboard.component.scss'],
  	host: {
		'(document:click)': 'handleClick($event)',
		'(keydown)': 'handleKeyDown($event)'
  	},
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DropdownSelectKeyboardComponent), multi: true },
	]
})
export class DropdownSelectKeyboardComponent implements ControlValueAccessor, OnInit {

	propagateChange:any = () => {};
	validateFn:any = () => {};
	checked = 0;
	focusIn = false;
	dropdownSelectValueWithKey;
  

  	query: string = '';
  	filteredList: any[] = [];
  	elementRef: ElementRef;
  	pos: number = -1;
  	opened: boolean = false;
  	selectedItem: any;
  	item: any;



	@Input('dropdownSelectValue') _dropdownSelectValue = '';
	@Input() question;
	@Input() form: FormGroup;

	constructor(private cdRef:ChangeDetectorRef, private renderer: Renderer, private el: ElementRef) { 
		this.elementRef = el;
	}


	onFocus(){
		this.focusIn = true;
		this.cdRef.detectChanges();
	}
	onBlur(){
		this.focusIn = false;
		this.cdRef.detectChanges();
	}
  	filterQuery() {
		this.filteredList = this.question.options.filter((el: any) => {
	  		return el.value.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
		});
  	}

  	filter(event: any) {
		if (this.query !== '') {
	  		if (this.opened) {
				if ((event.keyCode >= 48 && event.keyCode <= 57) ||
			  		(event.keyCode >= 65 && event.keyCode <= 90) ||
			  		(event.keyCode == 8)) {

			  		this.pos = 0;
			  		this.filterQuery();

				} else if (event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 13) {
			  		this.filteredList = this.question.options;
				}
			} else {
				this.filterQuery();
	  		}
		} else {
	  		if (this.opened) {
				this.filteredList = this.question.options;
	  		} else {
				this.filteredList = [];
	  		}
		}

		for (let i = 0; i < this.filteredList.length; i++) {
	  		this.filteredList[i].selected = false;
		}

		if (this.selectedItem) {
	  		this.filteredList.map((i) => {
				if (i.key == this.selectedItem.key) {
		  			this.pos = this.filteredList.indexOf(i);
				}
	  		})
	  		this.selectedItem = null;
		}

		// Arrow-key Down
		if (event.keyCode == 40) {
	  		if (this.pos + 1 != this.filteredList.length){
				this.pos++;
	  		}
		}

		// Arrow-key Up
		if (event.keyCode == 38) {
  			if (this.pos > 0)
				this.pos--;
			}

		if (this.filteredList[this.pos] !== undefined){ 
  			this.filteredList[this.pos].selected = true;
  		}

		//enter
		if (event.keyCode == 13) {
			if(!this.opened){
		  		this.opened = true;
		  		this.filteredList = this.question.options;
			}
			if (this.filteredList[this.pos] !== undefined) {
				this.select(this.filteredList[this.pos]);
			}
		}

		// Handle scroll position of item
		let listGroup = document.getElementById('list-group');
		let listItem = document.getElementById('true');
		if (listItem) {
			listGroup.scrollTop = (listItem.offsetTop - 200);
		}

  	}

  	select(item: any) {
		this.selectedItem = item;
		this.selectedItem.selected = true;
		this.query = item.value;
		this.filteredList = [];
		this.dropdownSelectValue = item;
		this.selectValue(item) 
		//this.opened = false;
  	}

  	showAll(input: any) {
		input.select();

		if (this.filteredList.length > 0) {
	  		this.opened = false;
	  		this.filteredList = [];
		} else {
	  		this.opened = true;
	  		this.filteredList = this.question.options;
		}
		if (this.query === '') {
	  		this.clearAll();
		}

		this.clearSelects();
  	}

  	handleKeyDown(event: any) {
		// Prevent default actions of arrows
		if (event.keyCode == 40 || event.keyCode == 38) {
	  		event.preventDefault();
		}
  	}

  	clearAll() {
		if (this.filteredList) {
	  		for (let i = 0; i < this.filteredList.length; i++){
				this.filteredList[i].selected = false;
			}
		}
	}

  	/** Remove selected from all items of the list **/
  	clearSelects() {
		if (this.selectedItem) {
	  		for (let i = 0; i < this.filteredList.length; i++) {
				if (this.filteredList[i].id != this.selectedItem.id){
		  			this.filteredList[i].selected = false;
				}
  			}
		}
  	}

  	/** Handle outside click to close suggestions**/
  	handleClick(event: any) {
		let clickedComponent = event.target;
		let inside = false;
		do {
	  		if (clickedComponent === this.elementRef.nativeElement) {
				inside = true;
	  		}
	  		clickedComponent = clickedComponent.parentNode;
		} while (clickedComponent);
		if (!inside) {
	  		this.filteredList = [];
	  		this.opened = false;
		}
  	}


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

	// ngAfterViewChecked(){
	// 	if( this.checked < 3 && this.question.order == 1){
	// 		document.getElementById(this.question.key).focus();
	// 		this.checked++;		
	// 	}

	// }
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