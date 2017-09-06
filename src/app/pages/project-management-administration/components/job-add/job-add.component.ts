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
	selector: 'job-add',
	styleUrls: [ './job-add.component.scss' ],
	templateUrl: './job-add.component.html',
//  	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class JobAdd implements OnInit {

	submitted:boolean = false;
  	anyErrors: boolean;
  	finished: boolean = false;
	homeRoute: string = '/project-management-administration/dashboard';
	questions;
	title:string;
	id:number;
  	sub: any;
  	flag: boolean;
	jobList: Observable<any[]>;
	jobs = [];
    jobActive: Observable<any>;
    jobUpdate: Observable<any>;
    job = {};
	isSubmissionInProcess = false;

	constructor( 
		private pmActions: ProjectManagementActions, private pmStore: Store<AppState>, 
		private route: ActivatedRoute, private router: Router, 
		private translate: TranslateService, private state: GlobalState ) {}

	ngOnInit() {
		this.getJobUpdate();
 		this.sub = this.route.params.subscribe(params => {
       		this.id = +params['id']; // (+) converts string 'id' to a number
	 		if(this.id){
	 			//if id, then report is being editied
	 			this.flag = true
                this.getJob();
	  		}
  			this.getJobs();
		});		
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
						this.jobs = jobs;
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

    getJob():void {
        this.pmStore.dispatch(this.pmActions.loadJob(this.id));
        this.jobActive = this.pmStore.select('loadJob');
        this.jobActive.subscribe(
            job => {
                if(job && job.id){
                    this.job = job;
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
		];
		this.questions.sort((a, b) => a.order - b.order);

		this.title = this.flag ? this.translate.instant('TITLE_EDIT_JOB') : this.translate.instant('TITLE_ADD_JOB');

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
		this.pmStore.dispatch(this.pmActions.saveJob(formData));


	}

	getJobUpdate():void {
		let first = true;
		this.jobUpdate = this.pmStore.select('saveJob');
	    this.jobUpdate.subscribe(
	        job => {
	        	if(!first && job){
	        		if(job.message){
						toastr.error(this.translate.instant(job.message));
						return;
	        		}
	        		if(job.statusCode){
	        			if(job.statusCode == 500){
							toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
							return;
						}
	        		}
	        		if(job.status){
	        			if(job.status == 500){
							toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
							return;
						}
	        		}
                    if(job.id){
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
		if(!this.jobs || !this.jobs.length){
			return false;
		}
        //check to see if duplicate
        return this.jobs.some(job => job.name == name);
 
	}

}
