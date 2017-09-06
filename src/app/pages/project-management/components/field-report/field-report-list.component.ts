import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { CommonModule, DatePipe } from "@angular/common"

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
	selector: 'field-report-list',
	styleUrls: [ './field-report-list.component.scss' ],
	templateUrl: './field-report-list.component.html',
})
export class FieldReportList implements OnInit {

	finished: boolean = false;
	dialogTitle = ''
	dialogBody = ''
	dialogContent = null
	itemsList:Object[] = [
		{
			title: this.translate.instant('OPEN_FIELD_REPORTS'),
			alerts: 0,
			statusType: 0,
			jobs : []
		},
		{
			title: this.translate.instant('CLOSED_FIELD_REPORTS'),
			statusType: 1,
			jobs : []
		},
	]
	homeRoute: string = '/project-management/dashboard';
	activeAccordionItem = null
	fieldReportActive: Observable<any>;
	fieldReportSent: Observable<any>;
	fieldReport;
	fieldReportDeleted: Observable<any>;
	fieldReports: Observable<any>;
	SubmittedFieldReports: Observable<any>;
	fieldReportSummary;
	jobCategoriesUpdate: Observable<any>;
	jobCategories = [];
	isDeleteInProcess = false;
	isSendInProcess = false;
	isLoadReportInProcess = false;
	isUpdateCategoryInProcess = false;
	isDeleteCategoryInProcess = false;
    fieldReportCategoryUpdate: Observable<any>;
    onRouteChange

  	isDesc: boolean = false;
  	column: string;

	direction: string;

	constructor(  private router: Router, private translate: TranslateService, 
		private state: GlobalState, private modalService: NgbModal,
		private pmActions: ProjectManagementActions, private pmStore: Store<AppState>, private datePipe: DatePipe ) {}

	ngOnInit() {
		this.finished = false;
		this.state.notifyDataChanged('menu.activeLink', {title: this.translate.instant('FIELD_REPORT')});                
		const job = this.state.getCurrent('job.activeJob') || {};
		this.activeAccordionItem = job;
		if(this.activeAccordionItem && this.activeAccordionItem.jobCode){
			this.state.notify('menu.componentMenuOpen', job.jobCode);
			this.openAccordionItem();
		}
		this.state.subscribe('job.activeJob', (activeJob) => {
			if(!activeJob){
				return
			}
		   	this.activeAccordionItem = activeJob;
			this.state.notify('menu.componentMenuOpen', activeJob.jobCode);
			this.openAccordionItem();
		});
		this.state.subscribe('job.newJob', (newjob) => {
			if(!newjob){
				return
			}
			if(this.isLoadReportInProcess){
				return;
			}
    		this.isLoadReportInProcess = true;
		   	this.activeAccordionItem = newjob;
			this.onRefresh();
			this.pmStore.dispatch(this.pmActions.loadFieldReport(newjob.id));
		});

        this.state.subscribe('menu.componentChildIconClicked', (menuItem) => {
        	// /project-management/field-report-detail/notes/473b3a54-d1d9-434d-a015-b67e49f5fde6/1/1496777615079
        	if(this.isDeleteCategoryInProcess){
        		return
        	}
       		this.isDeleteCategoryInProcess = true;
        	const parsedRoute = menuItem.route.path[0].split('/')
        	if(!parsedRoute.length){
        		return;
        	}
        	const fieldReportId = parsedRoute[parsedRoute.length-3]
       	 	if(this.fieldReport && this.fieldReport.id != fieldReportId){
       	 		return;
       	 	}
       		const categoryId = parsedRoute[parsedRoute.length-2]
			const activeModal = document.getElementById('dc-modal-field-report-list');
			if(activeModal){
				return;
			}

    		this.isLoadReportInProcess = true;
 			this.pmStore.dispatch(this.pmActions.loadFieldReport(fieldReportId));
      		const logId = parsedRoute[parsedRoute.length-1]
       	 	//check to ensure the field report is the same as this;
       	 	//confirm action
			this.dialogTitle = this.translate.instant('HEADING_DELETE_FIELD_REPORT_LOG')
			this.dialogBody = this.translate.instant('INFO_OK_DELETE_FIELD_REPORT_LOG') + menuItem.title +'.';
			this.modalService.open(this.dialogContent).result.then((result) => {
				//remove category and send field report home, when it returns, redo menu
				this.isUpdateCategoryInProcess = true
		        this.fieldReport = Util.removeCategoryLogObject(this.fieldReport, categoryId, logId)
        		const category = Util.getCategoryObject(this.fieldReport, categoryId);
				this.state.notify('menu.changeComponentMenu', Util.getFieldMenuChildren(this.jobCategories));
				this.createFieldReportMenu(this.fieldReport, categoryId);
        		this.pmStore.dispatch(this.pmActions.updateFieldReportCategory([this.fieldReport.id, category]));
				toastr.info(this.translate.instant('INFO_FIELD_REPORT_LOG_DELETED'));
        		this.isDeleteCategoryInProcess = false;

			}, (reason) => {
        		this.isDeleteCategoryInProcess = false;
			});   
       	 	// remove the log from the category
       	 	

        });
		this.onRouteChange = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
		 		if(this.activeAccordionItem && this.activeAccordionItem.jobCode && event.url == this.homeRoute){
					this.state.notify('menu.componentMenuOpen', this.activeAccordionItem.jobCode);
					this.openAccordionItem();
				}
			}
		});


		this.getFieldReports();
		this.getSubmittedFieldReports();
		this.deletedFieldReport();
		this.getFieldReport();
		this.sentFieldReport();
        this.updateFieldReportCategory();
		this.pmStore.dispatch(this.pmActions.loadFieldReports());
		this.pmStore.dispatch(this.pmActions.loadSubmittedFieldReports());
	}
	getFieldReports():void {
		this.fieldReports = this.pmStore.select('loadFieldReports');
		this.fieldReports.subscribe(
			fieldReports => {
			   	if(fieldReports && fieldReports.length){
					this.itemsList[0]['jobs']=[]
					fieldReports.forEach(fieldReport =>{
						if(fieldReport.status == 'Open'){
				    		this.itemsList[0]['jobs'].push(fieldReport);                    
						}else{
//				    		this.itemsList[1]['jobs'].push(fieldReport);                    							
						}
					})
					this.openAccordionItem();
			   	}
				this.finished = true;
			},
			error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
				this.router.navigate([ this.homeRoute ]);
			}

		);
	}
	getSubmittedFieldReports():void {
		this.SubmittedFieldReports = this.pmStore.select('loadSubmittedFieldReports');
		this.SubmittedFieldReports.subscribe(
			fieldReports => {
			   	if(fieldReports && fieldReports.length){
					this.itemsList[1]['jobs']=[]
					fieldReports.forEach(fieldReport =>{
						if(fieldReport.status == 'Open'){
//				    		this.itemsList[0]['jobs'].push(fieldReport);                    
						}else{
				    		this.itemsList[1]['jobs'].push(fieldReport);                    							
						}
					})
					this.openAccordionItem();
			   	}
				this.finished = true;
			},
			error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
				this.router.navigate([ this.homeRoute ]);
			}

		);
	}

	deletedFieldReport():void {
		this.fieldReportDeleted = this.pmStore.select('deleteFieldReport');
		this.fieldReportDeleted.subscribe(
			fieldReport => {
			   	if(fieldReport && fieldReport.ok){
			   		if(this.isDeleteInProcess){
						this.isDeleteInProcess = false
						toastr.info(this.translate.instant('INFO_FIELD_REPORT_DELETED'));
						this.fieldReport = null;
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

    updateFieldReportCategory():void {
        let first = true;
        this.fieldReportCategoryUpdate = this.pmStore.select('updateFieldReportCategory');
        this.fieldReportCategoryUpdate.subscribe(
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
                    if(fieldReport.id && this.isUpdateCategoryInProcess){
                        this.isUpdateCategoryInProcess = false
                    }
                }
                first = false
            },
            error => {
                toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
            }
        );
    }

	openAccordionItem(){
		if(!this.activeAccordionItem.id){
			return;
		}
		//check to see if an item in the accordion is active
		this.itemsList.forEach(item => {
			const openAccordionItem = item['jobs'].some(job => job.id == this.activeAccordionItem.id);
			if(openAccordionItem){
				this.state.notify('accordion.activeItem', { itemName: item['statusType'] });
			}
		})
	}
	onSend(job, dialogContent):void {
		this.state.notify('menu.componentMenuCloseActiveJob', job.jobCode);
		this.dialogTitle = this.translate.instant('HEADING_SUBMIT_FIELD_REPORT')
		this.dialogBody = this.translate.instant('INFO_OK_SUBMIT_FIELD_REPORT')
		this.modalService.open(dialogContent).result.then((result) => {
			this.isSendInProcess = true
			this.pmStore.dispatch(this.pmActions.sendFieldReport(job.id));
		}, (reason) => {
		});   
	}
	onDelete(job, dialogContent):void {
		this.state.notify('job.activeJob', null);
		this.dialogTitle = this.translate.instant('HEADING_DELETE_FIELD_REPORT')
		this.dialogBody = this.translate.instant('INFO_OK_DELETE_FIELD_REPORT')+ `${job.jobCode} ${this.datePipe.transform(job.forDay, 'mediumDate')}.`
		this.modalService.open(dialogContent).result.then((result) => {
			this.isDeleteInProcess = true
			this.pmStore.dispatch(this.pmActions.deleteFieldReport(job));
		}, (reason) => {
		});   
	}
	onCopy(job, dialogContent):void {
		this.state.notify('menu.componentMenuCloseActiveJob', job.jobCode);
		this.dialogTitle = this.translate.instant('HEADING_COPY_FIELD_REPORT')
		this.dialogBody = this.translate.instant('INFO_OK_COPY_FIELD_REPORT')
		this.modalService.open(dialogContent).result.then((result) => {
			toastr.info(this.translate.instant('INFO_FIELD_REPORT_COPIED'));
			this.state.notify('job.activeJob', job);
		}, (reason) => {
		});   
	}
	onFlag(job):void {
    	this.isLoadReportInProcess = true;
		this.pmStore.dispatch(this.pmActions.loadFieldReport(job.id));
		this.state.notify('job.activeJob', job);
		this.router.navigate(['/project-management/field-report-header', job.id]);
	}

	onAdd():void {
		this.state.notify('job.activeJob', {});
		this.activeAccordionItem = {};
		this.router.navigate(['/project-management/field-report-header', 0]);
	}
	onMenuChange(job, dialogContent):void {
		this.dialogContent = dialogContent;
    	this.isLoadReportInProcess = true;
		this.pmStore.dispatch(this.pmActions.loadFieldReport(job.id));
	}

	getFieldReport():void {
		this.fieldReportActive = this.pmStore.select('loadFieldReport');
		this.fieldReportActive.subscribe(
			fieldReport => {
				if(fieldReport && fieldReport.id){
                	if(!this.isLoadReportInProcess){
                		return
                	}
                	this.isLoadReportInProcess = false;
                	this.fieldReport = fieldReport;
					// create the fieldmenu for the field report
					this.getJobCategories(fieldReport)
					this.state.notify('job.activeJob', {id: fieldReport.id, jobCode: fieldReport.jobCode, forDay: fieldReport.forDay, status: fieldReport.status});
				}
			},
			error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
			 }

		);
	}
	sentFieldReport():void {
		this.fieldReportSent = this.pmStore.select('sendFieldReport');
		this.fieldReportSent.subscribe(
			fieldReport => {
				if(fieldReport && fieldReport.id){
                	if(!this.isSendInProcess){
                		return
                	}
                	this.isSendInProcess = false;
                	this.fieldReport = fieldReport;
					toastr.info(this.translate.instant('INFO_FIELD_REPORT_SUBMITTED'));
					// create the fieldmenu for the field report
					this.onRefresh()
				}
			},
			error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
			 }

		);
	}
	getJobCategories(fieldReport):void {
    	let load = true;
		this.pmStore.dispatch(this.pmActions.loadJobCategories(fieldReport.jobCode));
		this.jobCategoriesUpdate = this.pmStore.select('jobCategories');
		this.jobCategoriesUpdate.subscribe(
			jobCategories => {
				console.log(jobCategories);
			   	if(jobCategories && jobCategories.length){
                	if(!load){
                		return
                	}
                	load = false;
					this.jobCategories = jobCategories;                    
					this.state.notify('menu.changeComponentMenu', Util.getFieldMenuChildren(jobCategories));
					this.createFieldReportMenu(fieldReport);
			   	}
			},
			error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
				this.router.navigate([ this.homeRoute ]);
			}

		);
	}

	createFieldReportMenu(fieldReport, expandCategory?):void {
		if(!fieldReport.notes){
			return;
		}
		let reportPath = '';
		fieldReport.notes.forEach(category =>{
			//FIXME: change to componentType once the backend returns this information
			if(!category.content.length){
				return;
			}
	   
			const content = category.content[0].content;
			for (const key in content) {
				// skip loop if the property is from prototype
				if (!content.hasOwnProperty(key)) continue;

//                if(category.category && category.category == 'notes'){
					reportPath = `field-report-detail/notes/${fieldReport.id}/${category.description}/${key}`; 
 //               }/else{
 //                   reportPath= `field-report-detail/${category.category}/${fieldReport.id}/${key}`;
 //               }
 				let parentExpanded = false;
 				if(expandCategory && expandCategory == category.description){
 					parentExpanded = true;
 				}
				this.state.notify('menu.componentMenuAddChild', 
					{ 
						reportPath: reportPath, 
						title: this.datePipe.transform(key, 'short'),
						sortField: key,
						categoryId: category.description,
						attributeCount: Util.attributeCount(content[key]),
						expandCategory: parentExpanded 
					});                                    
			}
		})
	}
	onRefresh():void {
		this.pmStore.dispatch(this.pmActions.loadFieldReports());
		this.pmStore.dispatch(this.pmActions.loadSubmittedFieldReports());
	}


	sort(property){
	    this.isDesc = !this.isDesc; //change the direction    
	    this.column = property;
	    this.direction = this.isDesc ? 'asc' : 'desc';
	}

	ngOnDestroy():void {
	}


}
