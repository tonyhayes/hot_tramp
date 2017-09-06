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
	selector: 'project-add',
	styleUrls: [ './project-add.component.scss' ],
	templateUrl: './project-add.component.html',
//  	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ProjectAdd implements OnInit {

	submitted:boolean = false;
  	anyErrors: boolean;
  	finished: boolean = false;
	homeRoute: string = '/project-management-administration/dashboard';
	questions;
	userQuestionList;
	userComponentQuestions;
	categoryFormQuestionList;
	categoryFormComponentQuestions;
	userTitle:string;
	projectTitle:string;
	categoryFormTitle:string;
	id:number;
  	sub: any;
  	flag: boolean;
	projectList: Observable<any[]>;
	projects = [];
    projectActive: Observable<any>;
    projectUpdate: Observable<any>;
    project = {};
	isSubmissionInProcess = false;
	categoryList: Observable<any[]>;
	categories = [];
	jobList: Observable<any[]>;
	jobs = [];
	userList: Observable<any[]>;
	users = [];
	formList: Observable<any[]>;
	forms = [];

	constructor( 
		private pmActions: ProjectManagementActions, private pmStore: Store<AppState>, 
		private route: ActivatedRoute, private router: Router, 
		private translate: TranslateService, private state: GlobalState ) {}

	ngOnInit() {
		this.getProjectUpdate();
		this.getJobs();
		this.getCategories();
		this.getForms();
		this.getUsers();
 		this.sub = this.route.params.subscribe(params => {
       		this.id = +params['id']; // (+) converts string 'id' to a number
	 		if(this.id){
	 			//if id, then report is being editied
	 			this.flag = true
                this.getProject();
	  		}
  			this.getProjects();
		});		
	}
	getProjects():void {
		this.pmStore.dispatch(this.pmActions.loadProjects());
		this.projectList = this.pmStore.select('loadProjects');
	    this.projectList.subscribe(
	        projects => {
	        	if(projects){
	        		if(projects['statusCode'] || projects['status']){
						toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
						return;
	        		}
		        	if(projects.length){
						this.projects = projects;
		        	}
					this.getForm();	        		
	        	}
	        },
	        error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
				this.getForm();	        		
 	        }

	    );
	}
	getCategories():void {
		this.pmStore.dispatch(this.pmActions.loadCategories());
		this.categoryList = this.pmStore.select('loadCategories');
	    this.categoryList.subscribe(
	        categories => {
	        	if(categories){
	        		if(categories['statusCode'] || categories['status']){
						toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
						return;
	        		}
		        	if(categories.length){
						this.categories = categories.map(category => {
							return {key: category.name, value: category.description}
						});
		        	}
	        	}
	        },
	        error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
 	        }

	    );
	}
	getJobs():void {
		this.pmStore.dispatch(this.pmActions.loadJobs());
		this.jobList = this.pmStore.select('loadJobs');
	    this.jobList.subscribe(
	        jobs => {
	        	if(jobs){
	        		if(jobs['statusCode'] || jobs['status']){
						toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
						return;
	        		}
		        	if(jobs.length){
						this.jobs = jobs.map(job => {
							return {key: job.name, value: job.description}
						});
		        	}
	        	}
	        },
	        error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
 	        }

	    );
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
						this.forms = forms.map(form => {
							return {key: form.name, value: form.description}
						});
		        	}
	        	}
	        },
	        error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
 	        }

	    );
	}

	getUsers():void {
		this.users =[
			{key: 'jbuhner@dexchadev.com', value: 'John Buhner'},
			{key: 'sgossner@dexchadev.com', value: 'Sally Gossner'},
			{key: 'sam@dexchadev.com', value: 'Sam'},
		]  
		
	}

    getProject():void {
        this.pmStore.dispatch(this.pmActions.loadProject(this.id));
        this.projectActive = this.pmStore.select('loadProject');
        this.projectActive.subscribe(
            project => {
                if(project && project.id){
                    this.project = project;
                    this.getForm();
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

	getForm() {
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
			{
				key: 'jobCode',
				label: this.translate.instant('JOB'),
				type: 'text',
        		controlType: 'bs-dropdown',							
				groupColumns: "1-Column",
				order: 3,
				validators: [Validators.required],
				groupListStyle: true,
				required: true,
				options: this.jobs,
                value: this.project['jobCode'],
			},
			//FIXME - this will be a repeater
			{
				key: 'category',
				label: this.translate.instant('CATEGORY'),
				groupColumns: "2-Column",
				type: 'text',
        		controlType: 'bs-dropdown',							
				order: 4,
				groupListStyle: true,
				validators: [Validators.required],
				required: true,
				options: this.categories,
                value: this.project['category'],
			},
			{
				key: 'form',
				label: this.translate.instant('FORM'),
				type: 'text',
        		controlType: 'bs-dropdown',							
				order: 5,
				validators: [Validators.required],
				required: true,
				options: this.forms,
                value: this.project['form'],
			},
			//FIXME - this will be a repeater
			{
				key: 'assignedUser',
				label: this.translate.instant('ASSIGNED_USER'),
				groupColumns: "2-Column",
				type: 'text',
        		controlType: 'bs-dropdown',							
				order: 6,
				groupListStyle: true,
				validators: [Validators.required],
				required: true,
				options: this.users,
                value: this.project['assignedUser'],
			},
			{
				key: 'submitToUser',
				label: this.translate.instant('SEND_TO_USER'),
				type: 'text',
        		controlType: 'bs-dropdown',							
				order: 7,
				validators: [Validators.required],
				required: true,
				options: this.users,
                value: this.project['submitToUser'],
			},
		];
		this.questions.sort((a, b) => a.order - b.order);

		this.projectTitle = this.flag ? this.translate.instant('TITLE_EDIT_PROJECT') : this.translate.instant('TITLE_ADD_PROJECT');


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
		this.pmStore.dispatch(this.pmActions.saveProject(formData));


	}

	getProjectUpdate():void {
		let first = true;
		this.projectUpdate = this.pmStore.select('saveProject');
	    this.projectUpdate.subscribe(
	        project => {
	        	if(!first && project){
	        		if(project.message){
						toastr.error(this.translate.instant(project.message));
						return;
	        		}
	        		if(project.statusCode){
	        			if(project.statusCode == 500){
							toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
							return;
						}
	        		}
	        		if(project.status){
	        			if(project.status == 500){
							toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
							return;
						}
	        		}
                    if(project.id){
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
		if(!this.projects || !this.projects.length){
			return false;
		}
        //check to see if duplicate
        return this.projects.some(project => project.name == name);
 
	}

}
