import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormsModule, Validators } from '@angular/forms';


import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from "@angular/common"

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ProjectManagementActions } from '../../../../../../actions';
import { AppState } from '../../../../../../reducers';

import { ChangeDetectionStrategy } from '@angular/core';
import * as toastr from 'toastr';
import { TranslateService } from '../../../../../../translate';
import { QuestionBase, 
	InputQuestion, 
	DateQuestion, 
	NotesQuestion,
	BsDropdownQuestion,
	DropdownKeyboardQuestion
} from '../../../../../../framework/components/dynamic-form';
import { QuestionService } from '../../../../../../services';
import { GlobalState } from '../../../../../../global.state';
import { Util } from '../../../../../../framework/helpers/util';
import { Category } from '../../../../model/category';

@Component({
	selector: 'field-report-header',
	styleUrls: [ './field-report-header.component.scss' ],
	templateUrl: './field-report-header.component.html',
//  	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class FieldReportHeader implements OnInit {

	submitted:boolean = false;
  	anyErrors: boolean;
  	finished: boolean = false;
	homeRoute: string = '/project-management/dashboard';
	questions;
	componentQuestions;
	title:string;
	id:number;
  	sub: any;
  	flag: boolean;
	jobList: Observable<any[]>;
	jobs = [];
	user;
	fieldReportUpdate: Observable<any>;
    fieldReports: Observable<any>;
    fieldReportSummary = [];
    fieldReportActive: Observable<any>;
    fieldReport = {};
	jobCategories:Array<Category> = []
	jobCategoriesUpdate: Observable<Category[]>;
	isSubmissionInProcess = false;
	isSubmission2InProcess = false;

	constructor( 
		private pmActions: ProjectManagementActions, private pmStore: Store<AppState>, 
		private route: ActivatedRoute, private router: Router, 
		private translate: TranslateService, private questionService: QuestionService, private state: GlobalState ) {}

	ngOnInit() {
        this.user = this.state.getCurrent('auth0.userInfo');
        this.state.notifyDataChanged('menu.activeLink', {title: this.translate.instant('FIELD')});                
		this.getFieldReportUpdate();
 		this.sub = this.route.params.subscribe(params => {
       		this.id = +params['id']; // (+) converts string 'id' to a number
	 		if(this.id){
	 			//if id, then report is being flagged
	 			this.flag = true
                this.getFieldReport();
	  		}else{
	  			this.getJobCodes();
	  		}
			this.getFieldReports();
		});		
	}
	getJobCodes():void {
		this.pmStore.dispatch(this.pmActions.loadJobCodes());
		this.jobList = this.pmStore.select('jobCode');
	    this.jobList.subscribe(
	        jobs => {
	        	if(jobs){
	        		if(jobs['statusCode'] || jobs['status']){
						toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
						return;
	        		}
		        	if(jobs.length){
						this.jobs = jobs.map(job => {
							return {key: job.jobCode, value: job.jobDescription}
						});
		        	}
	        	}
				this.getForm();	        		
	        },
	        error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
				this.getForm();	        		
 	        }

	    );
	}

    getFieldReport():void {
        this.pmStore.dispatch(this.pmActions.getLoadedFieldReport());
        this.fieldReportActive = this.pmStore.select('loadedFieldReport');
        this.fieldReportActive.subscribe(
            fieldReport => {
                if(fieldReport && fieldReport.id){
                    this.fieldReport = fieldReport;
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
		//find out the device - if mobile, use non keyboard select
		const isMobileDevice = Util.isMobileOrTablet();

		const minDate = Util.getDate(-31);
		const maxDate = Util.getDate(8);
		const today = Util.getDate(0);
		this.questions = [
			{
				key: 'forDay',
				label: this.translate.instant('REPORT_DATE'),
				type: 'date',
                controlType: 'date',							
				order: 2,
				validators: [Validators.required],
				required: true,
				readonly: this.flag,
                value: {date: Util.formatDateObject(this.fieldReport['forDay']) || today},
                minValue: minDate,
                maxValue: maxDate,
			},
		];
		if(isMobileDevice){
			const question = {
				key: 'jobCode',
				label: this.translate.instant('JOB'),
				type: 'text',
                controlType: 'input',							
				groupColumns: "2-Column",
				order: 1,
				validators: [Validators.required],
				required: true,
				options: this.jobs,
				readonly: this.flag,
				placeholder: this.translate.instant('BUTTON_SELECT'),
                value: this.fieldReport['jobCode'],
			};

			this.questions.push(question);

		}else{
			const question = {
				key: 'jobCode',
				label: this.translate.instant('JOB'),
				type: 'text',
                controlType: 'input',							
				groupColumns: "2-Column",
				order: 1,
				validators: [Validators.required],
				required: true,
				options: this.jobs,
				readonly: this.flag,
				placeholder: this.translate.instant('BUTTON_SELECT'),
                value: this.fieldReport['jobCode'],
			}

			this.questions.push(question);

		}
		if(this.flag){
			const question = {
				key: 'flag',
				groupColumns: "1-Column",
				label: this.translate.instant('REPORT_FLAGGED_REASONS'),
                controlType: 'notes',							
				type: 'notes',
				order: 4,
                value: this.fieldReport['flag'],
			}					
			this.questions.push(question);

		}
		this.questions.sort((a, b) => a.order - b.order);

		// this.componentQuestions = this.questionService.groupDynamicFormComponents(questions);
		// this.questionList = this.questionService.createDynamicForm(this.componentQuestions);
		this.title = this.flag ? this.translate.instant('TITLE_FLAG_FIELD_REPORT') : this.translate.instant('TITLE_ADD_FIELD_REPORT');

		this.finished = true;
	}

    getFieldReports():void {
        this.pmStore.dispatch(this.pmActions.getLoadedFieldReports());
        this.fieldReports = this.pmStore.select('loadedFieldReports');
        this.fieldReports.subscribe(
            fieldReports => {
                console.log(fieldReports);
               	if(fieldReports && fieldReports.length){
                   this.fieldReportSummary = fieldReports;                    
               	}
            },
            error => {
                toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
                this.router.navigate([ this.homeRoute ]);
            }

        );
    }
    getJobCategories(formData):void {
        this.pmStore.dispatch(this.pmActions.loadJobCategories(formData.jobCode));
        this.jobCategoriesUpdate = this.pmStore.select('jobCategories');
        this.jobCategoriesUpdate.subscribe(
            jobCategories => {
            	if(!this.isSubmissionInProcess){
            		return;
            	}
               	if(jobCategories && jobCategories.length){
               		this.isSubmissionInProcess = false;
               		this.isSubmission2InProcess = true;
                   	this.jobCategories = jobCategories;                    
               		console.log('getJobCategories - submitForm')
                   	this.submitForm(formData, jobCategories);
               	}else{
               		console.log('getJobCategories - no response')
               	}
            },
            error => {
                toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
                this.router.navigate([ this.homeRoute ]);
            }

        );
    }



	onCancel(msg:string):void {
		this.router.navigate([ this.homeRoute ]);
	}
	onSubmit(formData):void {
		console.log(formData)
		const dateFormat = this.translate.instant('DATE_FORMAT');
		const dateSeperator = this.translate.instant('DATE_SEPERATOR');
		const forDay = Util.formatReportDate(dateFormat, formData.forDay, dateSeperator)

		if(this.isDuplicateFieldReport(formData.jobCode, forDay)){
			toastr.error(this.translate.instant('ERROR_DUPLICATE_FIELD_REPORT'));
            return;
		}
		this.isSubmissionInProcess = true;
		//get categories for the selected job, then submits the job
		this.jobCategories = [];
		this.getJobCategories(formData)
	}
	submitForm(formData, categories){
		//format the response
		const d = new Date()
		const dateFormat = this.translate.instant('DATE_FORMAT');
		const dateSeperator = this.translate.instant('DATE_SEPERATOR');
		const fieldReport = {
			actionee: this.user.id,/*Need User Information API unless the server will fill*/
  			jobCode: formData.jobCode,/*seleted from form*/
  			forDay: Util.formatReportDate(dateFormat, formData.forDay, dateSeperator),/*seleted from form*/
			createdDay: d.toISOString(),/*Need unless the server will fill*/
			notes: Util.convertCategoriesToFieldReportNoteHeader(categories)
		}
               		console.log('addFieldReport - submitForm')
		this.pmStore.dispatch(this.pmActions.addFieldReport(fieldReport));
	}

	getFieldReportUpdate():void {
		let first = true;
		this.fieldReportUpdate = this.pmStore.select('addFieldReport');
	    this.fieldReportUpdate.subscribe(
	        fieldReport => {
	        	if(!first && fieldReport){
	        		if(fieldReport.message){
						toastr.error(this.translate.instant(fieldReport.message));
						return;
	        		}
	        		if(fieldReport.statusCode){
	        			if(fieldReport.statusCode == 500){
							toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
							return;
						}
	        		}
	        		if(fieldReport.status){
	        			if(fieldReport.status == 500){
							toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
							return;
						}
	        		}
                    if(fieldReport.id && this.isSubmission2InProcess){
                    	this.isSubmission2InProcess = false
				        this.state.notifyAndForget('job.newJob', {id: fieldReport.id, jobCode: fieldReport.jobCode, forDay: fieldReport.forDay, status: fieldReport.status});
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
	isDuplicateFieldReport(jobCode, forDay){
		if(!this.fieldReportSummary || !this.fieldReportSummary.length){
			return false;
		}
        //check to see if an item in the field report summary
        return this.fieldReportSummary.some(job => job.jobCode == jobCode && job.forDay == forDay);
 	}
}
