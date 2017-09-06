import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormsModule, Validators } from '@angular/forms';


import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from "@angular/common"

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ProjectManagementActions } from '../../../../actions';
import { AppState } from '../../../../reducers';

import { ChangeDetectionStrategy } from '@angular/core';
import * as toastr from 'toastr';
import { TranslateService } from '../../../../translate';
import { GlobalState } from '../../../../global.state';
import { Util } from '../../../../framework/helpers/util';

@Component({
	selector: 'form-add',
	styleUrls: [ './form-add.component.scss' ],
	templateUrl: './form-add.component.html',
//  	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class FormAdd implements OnInit {

	submitted:boolean = false;
  	anyErrors: boolean;
  	finished: boolean = false;
	homeRoute: string = '/project-management-administration/dashboard';
	questions;
	title:string;
	id:number;
  	sub: any;
  	flag: boolean;
	formList: Observable<any[]>;
	forms = [];
    formActive: Observable<any>;
    formUpdate: Observable<any>;
    form = {};
	isSubmissionInProcess = false;
	formComponents = [
			{key: 'BsDropdownQuestion', value: 'Dropdown'},
			{key: 'InputQuestion', value: 'Input'},
			{key: 'DropdownQuestion', value: 'Dropdown - not bootstrap'},
			{key: 'DropdownKeyboardQuestion', value: 'Dropdown - keyboard'},
			{key: 'TextboxQuestion', value: 'Textbox'},
			{key: 'TextareaQuestion', value: 'Textarea'},
			{key: 'TextlineQuestion', value: 'Textline'},
			{key: 'RadioQuestion', value: 'Radio'},
			{key: 'CheckboxQuestion', value: 'Checkbox'},
			{key: 'DateQuestion', value: 'Date'},
			{key: 'TimeQuestion', value: 'Time'},
			{key: 'TagSelectQuestion', value: 'TagSelect'},
			{key: 'SignatureQuestion', value: 'Signature'},
			{key: 'PhotoQuestion', value: 'Photo'},
			{key: 'NotesQuestion', value: 'Notes'},
	]

	constructor( 
		private pmActions: ProjectManagementActions, private pmStore: Store<AppState>, 
		private route: ActivatedRoute, private router: Router, 
		private translate: TranslateService, private state: GlobalState ) {}

	ngOnInit() {
		this.getFormUpdate();
 		this.sub = this.route.params.subscribe(params => {
       		this.id = +params['id']; // (+) converts string 'id' to a number
	 		if(this.id){
	 			//if id, then report is being editied
	 			this.flag = true
                this.getForm();
	  		}
  			this.getForms();
		});		
	}
	getForms():void {
		this.pmStore.dispatch(this.pmActions.loadForms());
		this.formList = this.pmStore.select('loadForms');
	    this.formList.subscribe(
	        forms => {
	        	if(forms){
	        		if(forms['statusCode'] || forms['status']){
						toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
						return;
	        		}
		        	if(forms.length){
						this.forms = forms;
		        	}
					this.buildForm();	        		
	        	}
	        },
	        error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
				this.buildForm();	        		
 	        }

	    );
	}

    getForm():void {
        this.pmStore.dispatch(this.pmActions.loadForm(this.id));
        this.formActive = this.pmStore.select('loadForm');
        this.formActive.subscribe(
            form => {
                if(form && form.id){
                    this.form = form;
                    this.buildForm();
                }else{
                    toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
                    this.router.navigate([ this.homeRoute ]);
                }
            },
            error => {
                toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
                this.router.navigate([ this.homeRoute ]);
            }

        );
    }

	buildForm() {
		this.questions = [
			{
				key: 'name',
				label: this.translate.instant('NAME'),
				type: 'text',
        		controlType: 'input',							
				groupColumns: "2-Column",
				order: 1,
				validators: [Validators.required],
				required: true
			},
			{
				key: 'description',
				label: this.translate.instant('DESCRIPTION'),
				type: 'text',
        		controlType: 'input',							
				order: 2,
				validators: [Validators.required],
				required: true
			},
			//FIXME - need this to loop
			{
				key: 'formComponent',
				label: this.translate.instant('FORM_COMPONENT'),
				type: 'text',
        		controlType: 'bs-dropdown',							
				groupColumns: "1-Column",
				groupListStyle: true,
				order: 3,
				validators: [Validators.required],
				required: true,
				options: this.formComponents,
                value: this.form['formComponent'],
			},
		];
		this.questions.sort((a, b) => a.order - b.order);

		this.title = this.flag ? this.translate.instant('TITLE_EDIT_FORM') : this.translate.instant('TITLE_ADD_FORM');

		this.finished = true;
	}

 

	onCancel(msg:string):void {
		this.router.navigate([ this.homeRoute ]);
	}
	onSubmit(formData):void {

		if(this.isDuplicate(formData.name)){
			toastr.error(this.translate.instant('ERROR_DUPLICATE'));
            return;
		}
		this.pmStore.dispatch(this.pmActions.saveForm(formData));


	}

	getFormUpdate():void {
		let first = true;
		this.formUpdate = this.pmStore.select('saveForm');
	    this.formUpdate.subscribe(
	        form => {
	        	if(!first && form){
	        		if(form.message){
						toastr.error(this.translate.instant(form.message));
						return;
	        		}
	        		if(form.statusCode){
	        			if(form.statusCode == 500){
							toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
							return;
						}
	        		}
	        		if(form.status){
	        			if(form.status == 500){
							toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
							return;
						}
	        		}
                    if(form.id){
						this.router.navigate([ this.homeRoute ]);
	        		}
	        	}
	        	first = false
	        },
	        error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
	        }
	    );
	}
	isDuplicate(name){
		if(!this.forms || !this.forms.length){
			return false;
		}
        //check to see if duplicate
        return this.forms.some(form => form.name == name);
 
	}

}
