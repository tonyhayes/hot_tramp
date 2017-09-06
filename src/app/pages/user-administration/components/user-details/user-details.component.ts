import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormsModule, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from "@angular/common"

import { ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers';
import { UserAdministrationActions } from '../../../../actions';
import * as toastr from 'toastr';
import { UserBase, LicenseBase, Application } from '../../model';
import { TranslateService } from '../../../../translate';
import { QuestionBase } from '../../../../framework/components/dynamic-form';
import { QuestionService } from '../../../../services';
import { EmailValidator } from '../../../../framework/validators';

@Component({
	selector: 'user-details',
	styleUrls: [ './user-details.component.scss' ],
	templateUrl: './user-details.component.html',
//  	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UserDetails implements OnInit {

	private submitted:boolean = false;
  	private anyErrors: boolean;
  	private finished: boolean = false;
	private homeRoute: string = '/user-administration/user-list';
	private userSelection: Observable<UserBase>;
	protected user:UserBase;
  	private id: number;
  	private sub: any;
	public questions;
	private licenseList: Observable<Application[]>;
	private licences:Array<Application>
	private title:string;
	private userUpdate: Observable<any>;

	constructor( private userActions: UserAdministrationActions, private userStore: Store<AppState>, 
		private route: ActivatedRoute, private router: Router, 
		private translate: TranslateService, private questionService: QuestionService ) {}

	ngOnInit() {
 		this.sub = this.route.params.subscribe(params => {
       		this.id = +params['id']; // (+) converts string 'id' to a number
			this.getLicenses();
	 		if(this.id){
		  		this.getUser();  			
	  		}else{
	  			this.getForm();
	  		}
		});		
		this.getUserUpdate();
	}

	private getLicenses():void {

		this.licenseList = this.userStore.select('licenseAdministration');
	    this.licenseList.subscribe(
	        licenses => {
	        	if(licenses){
					this.licences = licenses;
	        	}
	        },
	        error => {
	        	console.log(error)
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));

	        }

	    );
	}
	private getUser():void {

		this.userStore.dispatch(this.userActions.loadUser());
		this.userSelection = this.userStore.select('userSelection');
	    this.userSelection.subscribe(
	        user => {
	        	if(user){
					this.user = user;
	  				this.getForm();
	        	}
	        },
	        error => console.log(error)

	    );
	}

	protected getForm() {
		this.questions = [
			{
				key: 'name',
				label: this.translate.instant('NAME'),
				type: 'text',
				groupColumns: "2-Column",
                controlType: 'input',							
				order: 1,
				validators: [Validators.required],
				required: true
			},
			{
				key: 'email',
				label: this.translate.instant('EMAIL_LOGON'),
				type: 'email',
                controlType: 'input',							
				order: 2,
				validators: [Validators.required, EmailValidator.validate],
				required: true
			},
		];
		this.questions.sort((a, b) => a.order - b.order);
		//add license;
		let k = 0;
		this.licences.forEach(licence => {
			if(licence.licensesUsed < licence.totalCount) {
				let question = null;
				if(k == 0){
					//group column entry triggers a new card
					question = {
						key: licence.applicationId,
						label: licence.applicationId,
						type: 'checkbox',
                		controlType: 'checkbox',							
						groupColumns: "3-Column",
						order: k+6
					}					
				}else{					
					question = {
						key: licence.applicationId,
						label: licence.applicationId,
						type: 'checkbox',
                		controlType: 'checkbox',							
						order: k+6
					}					
				}
				k++;
				this.questions.push(question);
			}

		})
		this.title = this.translate.instant('TITLE_ADD_NEW_USER');
		this.finished = true;


	}
	protected onCancel(msg:string):void {
		console.log('cancel');
		this.router.navigate([ this.homeRoute ]);
	}
	protected onSubmit(formData):void {
		console.log('submit');
		console.log(formData);
		let user = {};
		const applications:Array<any> = [];
        Object.keys(formData).forEach( (key) => {
        	if(key == 'email' || key == 'name' ){
		            user[key] = formData[key];        		
        	}else{
        		if(formData[key]){
	        		applications.push(key);        			
        		}
        	}
        })
        user['applications'] = applications;
		this.userStore.dispatch(this.userActions.addUser(user));
	}

	private getUserUpdate():void {
		let first = true;
		this.userUpdate = this.userStore.select('userAdd');
	    this.userUpdate.subscribe(
	        user => {
	        	if(!first && user){
	        		if(user.message){
						toastr.error(this.translate.instant(user.message));
						return;
	        		}
	        		if(user.statusCode){
	        			if(user.statusCode == 500){
							toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
							return;
						}
	        		}
	        		if(user.status){
	        			if(user.status == 500){
							toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
							return;
						}
	        		}
	        		if(user.response){
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



}
