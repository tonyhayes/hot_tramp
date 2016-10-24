import { Component, ViewContainerRef, ViewEncapsulation, OnInit } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import * as toastr from 'toastr';

import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  	moduleId: module.id,
	selector: 'smart-tables',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['smartTables.scss'],
	templateUrl: 'smartTables.html'
})
export class SmartTables implements OnInit {

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
		columns: {
			id: {
				title: 'ID',
				type: 'number'
			},
			firstName: {
				title: 'First Name',
				type: 'string'
			},
			lastName: {
				title: 'Last Name',
				type: 'string'
			},
			username: {
				title: 'Username',
				type: 'string'
			},
			email: {
				title: 'E-mail',
				type: 'string'
			},
			age: {
				title: 'Age',
				type: 'number'
			}
		}
	};

	source: LocalDataSource = new LocalDataSource();

	constructor(overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal, protected service: SmartTablesService) {
		overlay.defaultViewContainer = vcRef;  
	}

	ngOnInit() { 
		this.service.getData().then((data) => {
			this.source.load(data);
		});
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
