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
import { QuestionBase } from '../../../../framework/components/dynamic-form';
import { GlobalState } from '../../../../global.state';
import { Util } from '../../../../framework/helpers/util';
import { Category } from '../../../project-management/model/category';

@Component({
	selector: 'category-add',
	styleUrls: [ './category-add.component.scss' ],
	templateUrl: './category-add.component.html',
//  	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CategoryAdd implements OnInit {

	submitted:boolean = false;
  	anyErrors: boolean;
  	finished: boolean = false;
	homeRoute: string = '/project-management-administration/dashboard';
	questions;
	title:string;
	id:number;
  	sub: any;
  	flag: boolean;
	categoryList: Observable<any[]>;
	categories = [];
    categoryActive: Observable<any>;
    categoryUpdate: Observable<any>;
    category = {};
	isSubmissionInProcess = false;

	constructor( 
		private pmActions: ProjectManagementActions, private pmStore: Store<AppState>, 
		private route: ActivatedRoute, private router: Router, 
		private translate: TranslateService, private state: GlobalState ) {}

	ngOnInit() {
		this.getCategoryUpdate();
 		this.sub = this.route.params.subscribe(params => {
       		this.id = +params['id']; // (+) converts string 'id' to a number
	 		if(this.id){
	 			//if id, then report is being editied
	 			this.flag = true
                this.getCategory();
	  		}
  			this.getCategories();
		});		
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
						this.categories = categories;
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

    getCategory():void {
        this.pmStore.dispatch(this.pmActions.loadCategory(this.id));
        this.categoryActive = this.pmStore.select('loadCategory');
        this.categoryActive.subscribe(
            category => {
                if(category && category.id){
                    this.category = category;
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
				key: 'icon',
				label: this.translate.instant('ICON'),
				type: 'text',
        		controlType: 'input',							
				order: 3,
				validators: [Validators.required],
				required: true
			},
			{
				key: 'listStyle',
				label: this.translate.instant('ALLOW_MULTIPLE_FORM_ENTRIES'),
				type: 'checkbox',
        		controlType: 'checkbox',							
				order: 4,
			},					

		];
		this.questions.sort((a, b) => a.order - b.order);

		this.title = this.flag ? this.translate.instant('TITLE_EDIT_CATEGORY') : this.translate.instant('TITLE_ADD_CATEGORY');

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
		this.pmStore.dispatch(this.pmActions.saveCategory(formData));


	}

	getCategoryUpdate():void {
		let first = true;
		this.categoryUpdate = this.pmStore.select('saveCategory');
	    this.categoryUpdate.subscribe(
	        category => {
	        	if(!first && category){
	        		if(category.message){
						toastr.error(this.translate.instant(category.message));
						return;
	        		}
	        		if(category.statusCode){
	        			if(category.statusCode == 500){
							toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
							return;
						}
	        		}
	        		if(category.status){
	        			if(category.status == 500){
							toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
							return;
						}
	        		}
                    if(category.id){
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
		if(!this.categories || !this.categories.length){
			return false;
		}
        //check to see if duplicate
        return this.categories.some(category => category.name == name);
 
	}

}
