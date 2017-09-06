import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common"
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ProjectManagementActions } from '../../../../actions';
import { AppState } from '../../../../reducers';

import * as toastr from 'toastr';
import { TranslateService } from '../../../../translate';
import { Util } from '../../../../framework/helpers/util';
import { GlobalState } from '../../../../global.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
	selector: 'dc-form-list',
	styleUrls: [ './form.component.scss' ],
	templateUrl: './form.component.html',

})
export class FormList implements OnInit {

	form;
	formList = [];
	formDeleted: Observable<any>;
	forms: Observable<any>;
	isDeleteInProcess = false;
	homeRoute: string = '/project-management-administration/dashboard';
	dialogTitle = ''
	dialogBody = ''
	dialogContent = null
	searchText:string = "";

	constructor(  private router: Router, private translate: TranslateService, 
		private state: GlobalState, private modalService: NgbModal,
		private pmActions: ProjectManagementActions, private pmStore: Store<AppState> ) {}

	get filteredList() {
		if(!this.searchText){
	    	return this.formList;
		}
		const text = this.searchText.trim().toLowerCase();
	    if (text && text.length > 1) {
	    	console.log(text);
	      	return this.formList.filter((form) =>
	        	form.name && form.name.toString().toLowerCase().includes(text) ||
	        	form.description && form.description.toString().toLowerCase().includes(text)
	      	);
	    }
	    return this.formList;
	}


	ngOnInit() {

		this.getForms();
		this.deletedForm();
	}

	getForms():void {
		this.pmStore.dispatch(this.pmActions.loadForms());
		this.forms = this.pmStore.select('loadForms');
		this.forms.subscribe(
			forms => {
			   	if(forms && forms.length){
					this.formList=forms
			   	}
			},
			error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
				this.router.navigate([ this.homeRoute ]);
			}

		);
	}
	deletedForm():void {
		this.formDeleted = this.pmStore.select('deleteForm');
		this.formDeleted.subscribe(
			form => {
			   	if(form && form.ok){
			   		if(this.isDeleteInProcess){
						this.isDeleteInProcess = false
						toastr.info(this.translate.instant('INFO_FORM_DELETED'));
						this.form = null;
						this.onRefresh()
			   		}
			   }
			},
			error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
				this.router.navigate([ this.homeRoute ]);
			}

		);
	}

	onAdd():void {
		this.router.navigate(['/project-management-administration/form-add', 0]);
	}

	onDeleteConfirm(form, dialogContent):void {
		this.dialogTitle = this.translate.instant('HEADING_DELETE_FORM')
		this.dialogBody = this.translate.instant('INFO_OK_DELETE_FORM')+ `${form.name} }.`
		this.modalService.open(dialogContent).result.then((result) => {
			this.isDeleteInProcess = true
			this.pmStore.dispatch(this.pmActions.deleteForm(form));
		}, (reason) => {
		});   
	}
	onEdit(form, dialogContent):void {
		this.dialogContent = dialogContent;
		this.router.navigate(['/project-management-administration/form-add', form.id]);
	}
	onFormDesign(form, dialogContent):void {
		this.dialogContent = dialogContent;
		this.router.navigate(['/project-management-administration/form-design', form.id]);
	}
	onRefresh():void {
		this.pmStore.dispatch(this.pmActions.loadForms());
	}
	ngOnDestroy():void {
	}


}
