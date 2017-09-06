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
	selector: 'form-design',
	styleUrls: [ './form-design.component.scss' ],
	templateUrl: './form-design.component.html',
//  	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class FormDesign implements OnInit {

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
	 		// if(this.id){
	 		// 	//if id, then report is being editied
	 		// 	this.flag = true
    //             this.getForm();
	  	// 	}
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
		if(this.id == 0){
			this.questions = [
				{
	                key: 'temp',
	                label: this.translate.instant('TEMP'),
	                type: 'number',
	                groupColumns: "3-Column",
	                groupTitle: 'Weather',
	                order: 1,
	                value: null,
	                controlType: 'input'							
				},
				{
	                key: 'wind',
	                label: this.translate.instant('WIND'),
	                type: 'text',
	                order: 2,
	                value: null,
	                controlType: 'input'							
				},
				{
	                key: 'precip',
	                label: this.translate.instant('PRECIP'),
	                type: 'text',
	                order: 3,
	                value: null,
	                controlType: 'input'							
				},
				{
	                key: 'event',
	                label: this.translate.instant('EVENT'),
	                type: 'text',
	                order: 4,
	                value: null,
	                controlType: 'input'							
				},
				{
	                key: 'sky',
	                label: this.translate.instant('SKY'),
	                type: 'text',
	                order: 5,
	                value: null,
	                controlType: 'input'							
				},
				{
	                key: 'ground',
	                label: this.translate.instant('GROUND'),
	                type: 'text',
	                order: 6,
	                value: null,
	                controlType: 'input'							
				},
				{
	                key: 'delay',
	                label: this.translate.instant('WEATHER_DELAY'),
	                type: 'checkbox',
	                order: 7,
	                value: null,
	                controlType: 'checkbox'							
				},
				{
	                key: 'photo',
	                label: this.translate.instant('PHOTO_ATTACHMENTS'),
	                type: 'photo',
	                groupColumns: "1-Column",
	                groupTitle: this.translate.instant('PHOTO_ATTACHMENTS'),
	                order: 8,
	                value: null,
	                controlType: 'photo'							
				},
				{
                    key: 'observation',
                    label: this.translate.instant('WEATHER_REPORT'),
                    type: 'weather-underground',
                    groupColumns: "1-Column",
                    groupTitle: this.translate.instant('WEATHER_REPORT'),
                    order: 9,
                    value: null,
                    controlType: 'weather-underground'							
				},

			];
		}
		if(this.id == 1){
			this.questions = [
				{
                    key: 'name',
                    label: this.translate.instant('VISITOR_NAME'),
                    type: 'text',
                    groupColumns: "2-Column",
                    groupTitle: this.translate.instant('VISITOR'),
                    order: 1,
                    value: null,
                    controlType: 'input'							
				},
				{
                    key: 'company',
                    label: this.translate.instant('COMPANY'),
                    type: 'text',
                    order: 2,
                    value: null,
                    controlType: 'input'							
				},
				{
                    key: 'for',
                    label: this.translate.instant('FOR'),
                    type: 'text',
                    order: 3,
                    value: null,
                    controlType: 'input'							
				},
				{
                    key: 'to',
                    label: this.translate.instant('TO_SEE'),
                    type: 'text',
                    order: 4,
                    value: null,
                    controlType: 'input'							
				},
				{
                    key: 'timeIn',
                    label: this.translate.instant('TIME'),
                    type: 'time',
                    groupColumns: "2-Column",
                    groupTitle: 'Time',
                    order: 5,
                    value: null,
                    controlType: 'time'							
				},
				{
                    key: 'timeOut',
                    label: this.translate.instant('TIME_OUT'),
                    type: 'time',
                    order: 6,
                    value: null,
                    controlType: 'time'							
				},
				{
	                key: 'delay',
	                label: this.translate.instant('WEATHER_DELAY'),
	                type: 'checkbox',
	                order: 7,
	                value: null,
	                controlType: 'checkbox'							
				},
				{
                    key: 'signature',
                    label: this.translate.instant('VISTOR_SIGNATURE'),
                    type: 'signature',
                    groupColumns: "1-Column",
                    groupTitle: this.translate.instant('VISTOR_SIGNATURE'),
                    order: 7,
                    value: null,
                    controlType: 'signature'							
				},
			];
		}
		if(this.id == 2){
			this.questions = [
				{
					key: 'location',
					label: this.translate.instant('LOCATION'),
					type: 'text',
					order: 1,
				 	groupColumns: "1-Column",
				 	groupTitle: this.translate.instant('WORK_COMPLETED'),
                    value: null,
                    controlType: 'input'							
				},
				{
					key: 'phase',
					label: this.translate.instant('PHASE'),
					type: 'text',
					order: 2,
                    value: null,
                    controlType: 'input'							
				},
				{
					key: 'notes',
					label:this.translate.instant('NOTES'),
					type: 'text',
					groupColumns: "1-Column",
					groupTitle: this.translate.instant('NOTES'),
					order: 3,
                    value: null,
                    controlType: 'notes'							
				},
			];
		}
		this.questions.sort((a, b) => a.order - b.order);

		this.title = this.flag ? this.translate.instant('TITLE_DESIGN_FORM') : this.translate.instant('TITLE_DESIGN_FORM');

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
	onQuestionsChanged(questions){
		console.log(questions);
//		questions.sort((a, b) => a.order - b.order);

		this.questions = questions;

	}

}
