import { Component, OnInit, forwardRef, Input, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import * as toastr from 'toastr';

import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
	selector: 'dc-smart-grid',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['grid.component.scss'],
	template: `
      	<ng2-smart-table 
      		[settings]="settings" 
      		[source]="source" 
      		(deleteConfirm)="onDeleteConfirm($event)">
      	</ng2-smart-table>
	`,
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => GridSmartComponent), multi: true },
	]
})

export class GridSmartComponent implements ControlValueAccessor, OnInit {

	propagateChange:any = () => {};
  
	@Input('gridValue') _gridValue = 'Select';
	@Input() question;
	@Input() form: FormGroup;
	private items: any [];
  	private _disabledV:string = '0';
  	private disabled:boolean = false;

	query: string = '';

	settings = {
		add: {
			addButtonContent: '<i class="ion-ios-plus-outline"></i>',
			createButtonContent: '<i class="ion-checkmark"></i>',
			cancelButtonContent: '<i class="ion-close"></i>',
		},
		edit: {
			editButtonContent: '<i class="ion-edit"></i>',
			saveButtonContent: '<i class="ion-checkmark"></i>',
			cancelButtonContent: '<i class="ion-close"></i>',
		},
		delete: {
			deleteButtonContent: '<i class="ion-trash-a"></i>',
			confirmDelete: true
		},
		columns: {}
	};

	source: LocalDataSource = new LocalDataSource();

	constructor(overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
		overlay.defaultViewContainer = vcRef;  
	}

	get gridValue() {
		return this._gridValue;
	}
  
	set gridValue(val) {
		this._gridValue = val;
		this.propagateChange(val);
	}

	public ngOnInit():void {
		this.question.columns.forEach( column => {
			this.settings.columns[column.key] = { 'title': column.label };
		});
		this.source.load(this.question.data);
	}

	writeValue(value) {
		if (value) {
			this.gridValue = value;
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
	onDeleteConfirm(event): void {
		this.modal.confirm()
							.size('sm')
							.isBlocking(true)
							.showClose(true)
							.keyboard(27)
							.title('Delete Record')
							.body('Pressing OK will delete this record')
							.open()
							.then((resultPromise) => {
									resultPromise.result.then((result) => {
									event.confirm.resolve();
									toastr.info('record deleted');
								}, () => {
								event.confirm.reject();
							});
		});
	}
}