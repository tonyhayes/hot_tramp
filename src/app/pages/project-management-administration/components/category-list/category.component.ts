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
	selector: 'dc-category-list',
	styleUrls: [ './category.component.scss' ],
	templateUrl: './category.component.html',

})
export class CategoryList implements OnInit {

	category;
	categoryList = [];
	categoryDeleted: Observable<any>;
	categories: Observable<any>;
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
	    	return this.categoryList;
		}
		const text = this.searchText.trim().toLowerCase();
	    if (text && text.length > 1) {
	    	console.log(text);
	      	return this.categoryList.filter((category) =>
	        	category.name && category.name.toString().toLowerCase().includes(text) ||
	        	category.description && category.description.toString().toLowerCase().includes(text)
	      	);
	    }
	    return this.categoryList;
	}


	ngOnInit() {

		this.getCategories();
		this.deletedCategory();
	}

	getCategories():void {
		this.pmStore.dispatch(this.pmActions.loadCategories());
		this.categories = this.pmStore.select('loadCategories');
		this.categories.subscribe(
			categories => {
			   	if(categories && categories.length){
					this.categoryList=categories
			   	}
			},
			error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
				this.router.navigate([ this.homeRoute ]);
			}

		);
	}
	deletedCategory():void {
		this.categoryDeleted = this.pmStore.select('deleteCategory');
		this.categoryDeleted.subscribe(
			category => {
			   	if(category && category.ok){
			   		if(this.isDeleteInProcess){
						this.isDeleteInProcess = false
						toastr.info(this.translate.instant('INFO_CATEGORY_DELETED'));
						this.category = null;
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
		this.router.navigate(['/project-management-administration/category-add', 0]);
	}

	onDeleteConfirm(category, dialogContent):void {
		this.dialogTitle = this.translate.instant('HEADING_DELETE_CATEGORY')
		this.dialogBody = this.translate.instant('INFO_OK_DELETE_CATEGORY')+ `${category.name} }.`
		this.modalService.open(dialogContent).result.then((result) => {
			this.isDeleteInProcess = true
			this.pmStore.dispatch(this.pmActions.deleteCategory(category));
		}, (reason) => {
		});   
	}
	onEdit(category, dialogContent):void {
		this.dialogContent = dialogContent;
		this.router.navigate(['/project-management-administration/category-add', category.id]);
	}
	onRefresh():void {
		this.pmStore.dispatch(this.pmActions.loadCategories());
	}
	ngOnDestroy():void {
	}


}
