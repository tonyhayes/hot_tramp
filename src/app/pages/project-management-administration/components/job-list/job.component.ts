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
	selector: 'dc-job-list',
	styleUrls: [ './job.component.scss' ],
	templateUrl: './job.component.html',

})
export class JobList implements OnInit {

	job;
	jobList = [];
	jobDeleted: Observable<any>;
	jobs: Observable<any>;
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
	    	return this.jobList;
		}
		const text = this.searchText.trim().toLowerCase();
	    if (text && text.length > 1) {
	    	console.log(text);
	      	return this.jobList.filter((job) =>
	        	job.name && job.name.toString().toLowerCase().includes(text) ||
	        	job.description && job.description.toString().toLowerCase().includes(text)
	      	);
	    }
	    return this.jobList;
	}


	ngOnInit() {

		this.getJobs();
		this.deletedJob();
	}

	getJobs():void {
		this.pmStore.dispatch(this.pmActions.loadJobs());
		this.jobs = this.pmStore.select('loadJobs');
		this.jobs.subscribe(
			jobs => {
			   	if(jobs && jobs.length){
					this.jobList=jobs
			   	}
			},
			error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
				this.router.navigate([ this.homeRoute ]);
			}

		);
	}
	deletedJob():void {
		this.jobDeleted = this.pmStore.select('deleteJob');
		this.jobDeleted.subscribe(
			job => {
			   	if(job && job.ok){
			   		if(this.isDeleteInProcess){
						this.isDeleteInProcess = false
						toastr.info(this.translate.instant('INFO_JOB_DELETED'));
						this.job = null;
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
		this.router.navigate(['/project-management-administration/job-add', 0]);
	}

	onDeleteConfirm(job, dialogContent):void {
		this.dialogTitle = this.translate.instant('HEADING_DELETE_JOB')
		this.dialogBody = this.translate.instant('INFO_OK_DELETE_JOB')+ `${job.name} }.`
		this.modalService.open(dialogContent).result.then((result) => {
			this.isDeleteInProcess = true
			this.pmStore.dispatch(this.pmActions.deleteJob(job));
		}, (reason) => {
		});   
	}
	onEdit(job, dialogContent):void {
		this.dialogContent = dialogContent;
		this.router.navigate(['/project-management-administration/job-add', job.id]);
	}
	onRefresh():void {
		this.pmStore.dispatch(this.pmActions.loadJobs());
	}
	ngOnDestroy():void {
	}


}
