import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormsModule, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ProjectManagementActions } from '../../../../../../actions';
import { AppState } from '../../../../../../reducers';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonModule, DatePipe } from "@angular/common"

import { ChangeDetectionStrategy } from '@angular/core';
import * as toastr from 'toastr';
import { TranslateService } from '../../../../../../translate';
import { QuestionBase } from '../../../../../../framework/components/dynamic-form';
import { QuestionService } from '../../../../../../services';
import { GlobalState } from '../../../../../../global.state';
import { Util } from '../../../../../../framework/helpers/util';
import { CategoryQuestions } from '../../../../model/job';
import { Category } from '../../../../model/category';

@Component({
	selector: 'field-report-notes',
	styleUrls: [ './notes.component.scss' ],
	templateUrl: './notes.component.html',
//      changeDetection: ChangeDetectionStrategy.OnPush,

})
export class Notes implements OnInit {

	submitted:boolean = false;
	anyErrors: boolean;
	finished: boolean = false;
	homeRoute: string = '/project-management/dashboard';
	questionList;
	componentQuestions;
	itemList;
	cardMode:string = 'none';
	componentItems;
	id:string;
	categoryId:string;
	component:string;
	owner:string = 'Fred';
	sub: any;
	title: string;    
	time: number;    
	category:Category;
	questions:QuestionBase<any>[];

	categoryActive: Observable<CategoryQuestions>;
	fieldReportActive: Observable<any>;
	fieldReport;
//    fieldReportUpdate: Observable<any>;
//	fieldReportDeleted: Observable<any>;
	isSaveInProcess:boolean = false;
//    isSubmissionInProcess:boolean = false;
	fieldReportCategoryUpdate: Observable<any>;
	newLogEntry = false;

	constructor(  
		private pmActions: ProjectManagementActions, private pmStore: Store<AppState>, 
		private route: ActivatedRoute, private router: Router, 
		private translate: TranslateService, private questionService: QuestionService, private state: GlobalState, private datePipe: DatePipe ) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.finished = false;
			this.id = params['fieldReportId']; // (+) converts string 'id' to a number
			this.categoryId = params['categoryId']; 
			this.time = +params['logId']; 
			this.updateFieldReportCategory();
			this.getFieldReport();            
		}); 

	}
	getFieldReport():void {
		let load = true;
		this.pmStore.dispatch(this.pmActions.loadFieldReport(this.id));
		this.fieldReportActive = this.pmStore.select('loadFieldReport');
		this.fieldReportActive.subscribe(
			fieldReport => {            	
				if(fieldReport && fieldReport.id){
					if(!load){
						return
					}
					load = false;
					this.fieldReport = fieldReport;
					this.getFieldReportCategory();
				}
			},
			error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
				this.router.navigate([ this.homeRoute ]);
			}

		);
	}
	getFieldReportCategory():void {
		let load = true;
		this.pmStore.dispatch(this.pmActions.loadJobCategory([this.fieldReport.jobCode, this.categoryId]));
		this.categoryActive = this.pmStore.select('jobCategory');
		this.categoryActive.subscribe(
			(categoryQuestions:CategoryQuestions) => {
				if(categoryQuestions && categoryQuestions.jobCode){
					if(!load){
						return
					}
					load = false;
					this.category = categoryQuestions.category;
        			this.state.notifyDataChanged('menu.activeLink', { title: this.category.title });                
					this.questions = categoryQuestions.questionList;
					this.getForm();
				}
			},
			error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
				this.router.navigate([ this.homeRoute ]);
			}
		);
	}

	getForm() {
		this.title = `${this.fieldReport.jobCode} :
			\u00A0\u00A0\ 
			${this.fieldReport.jobDescription} 
			\u00A0\u00A0\ 
			${ this.datePipe.transform(this.time, 'short') } `
		//locate component entry to be loaded in the form from the field report
		// if no entry is found, then it's an empty form
		const data = Util.getCategoryLogObject(this.fieldReport, this.category.id, this.time/*, this.topic*/ )
		this.questions.forEach(question =>{
			question.value = null;
		})
		if(data){
			this.questions.forEach(question =>{
				question.value = data[question.key]
			})
		}else{
			this.newLogEntry = true;
			this.state.notifyDataChanged('menu.componentMenuAddChild', 
				{ 
					reportPath: `field-report-detail/notes/${this.id}/${this.category.id}/${this.time}`, 
					title: this.datePipe.transform(this.time, 'short'),
					sortField: this.time,
					categoryId: this.category.id,
					attributeCount: 0,
					expandCategory: true 
				});                
		}        

		this.state.notifyDataChanged('menu.activeLink', { title: this.category.title });                
		this.finished = true;

	}
	onCancel(msg:string):void {
		if(this.newLogEntry){
			this.state.notifyDataChanged('menu.componentMenuRemoveChild', 
				{ 
					reportPath: `field-report-detail/notes/${this.id}/${this.category.id}/${this.time}`, 
					title: this.datePipe.transform(this.time, 'short'),
					categoryId: this.category.id
				});                
		}
		this.newLogEntry = false;
		this.router.navigate([ this.homeRoute ]);
	}
	onSubmit(formData):void {
		this.newLogEntry = false;
		this.isSaveInProcess = true
		this.fieldReport = Util.insertCategoryLogObject(this.fieldReport, this.categoryId, this.time, formData/*, this.topic*/)
		const category = Util.getCategoryObject(this.fieldReport, this.categoryId);
		this.pmStore.dispatch(this.pmActions.updateFieldReportCategory([this.fieldReport.id, category]));
	}
	updateFieldReportCategory():void {
		let first = true;
		this.fieldReportCategoryUpdate = this.pmStore.select('updateFieldReportCategory');
		this.fieldReportCategoryUpdate.subscribe(
			fieldReport => {
				if(!first && fieldReport){
					if(fieldReport.message){
					   	this.isSaveInProcess = false
						toastr.error(this.translate.instant(fieldReport.message));
						return;
					}
					if(fieldReport.error){
						this.isSaveInProcess = false
						toastr.error(this.translate.instant(fieldReport.error));
						return;
					}
					if(fieldReport.statusCode){
						if(fieldReport.statusCode == 500){
							toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
							this.isSaveInProcess = false
							return;
						}
					}
					if(fieldReport.status){
						if(fieldReport.status == 500){
	                       	this.isSaveInProcess = false
 							toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
							return;
						}
					}
					if(fieldReport.id && this.isSaveInProcess){
						this.isSaveInProcess = false
						this.state.notify('job.activeJob', {id: fieldReport.id, jobCode: fieldReport.jobCode, forDay: fieldReport.forDay, status: fieldReport.status});
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
 
	ngOnDestroy():void {
		if(this.newLogEntry){
			this.state.notifyDataChanged('menu.componentMenuRemoveChild', 
				{ 
					reportPath: `field-report-detail/notes/${this.id}/${this.category.id}/${this.time}`, 
					title: this.datePipe.transform(this.time, 'short'),
					categoryId: this.category.id
				});                
		}
	}

}
