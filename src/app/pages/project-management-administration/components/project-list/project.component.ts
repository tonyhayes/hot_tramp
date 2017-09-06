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
	selector: 'dc-project-list',
	styleUrls: [ './project.component.scss' ],
	templateUrl: './project.component.html',

})
export class ProjectList implements OnInit {

	project;
	projectList = [];
	projectDeleted: Observable<any>;
	projects: Observable<any>;
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
	    	return this.projectList;
		}
		const text = this.searchText.trim().toLowerCase();
	    if (text && text.length > 1) {
	    	console.log(text);
	      	return this.projectList.filter((project) =>
	        	project.name && project.name.toString().toLowerCase().includes(text) ||
	        	project.description && project.description.toString().toLowerCase().includes(text)
	      	);
	    }
	    return this.projectList;
	}


	ngOnInit() {

		this.getProjects();
		this.deletedProject();
	}

	getProjects():void {
		this.pmStore.dispatch(this.pmActions.loadProjects());
		this.projects = this.pmStore.select('loadProjects');
		this.projects.subscribe(
			projects => {
			   	if(projects && projects.length){
					this.projectList=projects
			   	}
			},
			error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
				this.router.navigate([ this.homeRoute ]);
			}

		);
	}
	deletedProject():void {
		this.projectDeleted = this.pmStore.select('deleteProject');
		this.projectDeleted.subscribe(
			project => {
			   	if(project && project.ok){
			   		if(this.isDeleteInProcess){
						this.isDeleteInProcess = false
						toastr.info(this.translate.instant('INFO_PROJECT_DELETED'));
						this.project = null;
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
		this.router.navigate(['/project-management-administration/project-add', 0]);
	}

	onDeleteConfirm(project, dialogContent):void {
		this.dialogTitle = this.translate.instant('HEADING_DELETE_PROJECT')
		this.dialogBody = this.translate.instant('INFO_OK_DELETE_PROJECT')+ `${project.projectCode} }.`
		this.modalService.open(dialogContent).result.then((result) => {
			this.isDeleteInProcess = true
			this.pmStore.dispatch(this.pmActions.deleteProject(project));
		}, (reason) => {
		});   
	}
	onEdit(project, dialogContent):void {
		this.dialogContent = dialogContent;
		this.router.navigate(['/project-management-administration/project-add', project.id]);
	}
	onRefresh():void {
		this.pmStore.dispatch(this.pmActions.loadProjects());
	}
	ngOnDestroy():void {
	}


}
