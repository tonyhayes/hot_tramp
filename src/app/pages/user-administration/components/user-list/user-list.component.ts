import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from "@angular/common"
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Observable';

import { ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserAdministrationActions } from '../../../../actions';
import { AppState } from '../../../../reducers';
import * as toastr from 'toastr';
import { UserBase, LicenseBase, Application } from '../../model';
import { TranslateService } from '../../../../translate';
import { Util } from '../../../../framework/helpers/util';

@Component({
	selector: 'user-list',
	styleUrls: [ './user-list.component.scss' ],
	templateUrl: './user-list.component.html',
//  	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UserList implements OnInit {

	licenseList: Observable<Application[]>;
	userList: Observable<UserBase[]>;
	userUpdate: Observable<UserBase>;
	userDelete: Observable<any>;
	users:Array<UserBase>
	licences:Array<Application>

 	anyErrors: boolean;
  	finished: boolean;
	homeRoute: string = '/user-administration/user-list';
	searchText:string = "";

	uniqueId:string = "";
	currentApplicationId:string = "";
	currentUser:UserBase = null;
    dialogTitle = ''
    dialogBody = ''

	constructor( private userActions: UserAdministrationActions, private userStore: Store<AppState>, private router: Router, private translate: TranslateService, private modalService: NgbModal ) {}

	ngOnInit() {
		this.getLicenses();
		this.getUsers();
		this.getUserUpdate();
		this.getUserDeleteAction();
	}

	get filteredUserList():UserBase[] {
		if(!this.searchText){
	    	return this.users;
		}
		const text = this.searchText.trim().toLowerCase();
	    if (text && text.length > 1) {
	    	console.log(text);
	      	return this.users.filter((user) =>
	        	user.givenName && user.givenName.toLowerCase().includes(text) ||
	        	user.familyName && user.familyName.toLowerCase().includes(text) ||
	        	user.name && user.name.toLowerCase().includes(text) ||
	        	user.nickname && user.nickname.toLowerCase().includes(text) ||
	        	user.email && user.email.toLowerCase().includes(text)
	      	);
	    }
	    return this.users;
	}
	get applicationLicenseList():Application[] {
	    return this.licences;
	}
	getUsers():void {
		this.userStore.dispatch(this.userActions.loadUsers());
		this.userList = this.userStore.select('userAdministration');
	    this.userList.subscribe(
	        users => {
	        	if(users){
	        		if(users['statusCode'] || users['status']){
						toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
						return;
	        		}
		        	if(users.length){
		        		console.log('users loaded')
		        		console.log(users)
						this.users = users;
						this.finished = true;
		        	}
	        		
	        	}
	        },
	        error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
 	        }

	    );
	}

	getLicenses():void {
		this.userStore.dispatch(this.userActions.loadLicenses());
		this.licenseList = this.userStore.select('licenseAdministration');
	    this.licenseList.subscribe(
	        licenses => {
	        	if(licenses){
	        		if(licenses['statusCode'] || licenses['status']){
						toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
						return;
	        		}
	        		console.log('licenses loaded')
	        		console.log(licenses)
					this.licences = licenses;
	        	}
	        },
	        error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));

	        }

	    );
	}
	getUserUpdate():void {
		this.userUpdate = this.userStore.select('userLicense');
	    this.userUpdate.subscribe(
	        user => {
	        	if(user){
	        		if(user['status']){
						toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
						return;
	        		}
					if(user['statusCode']){
						if (this.uniqueId) {
							if (user['message']) {
								toastr.error(this.translate.instant(user['message']));
							}

							// toggle the checkbox
							document.getElementById(this.uniqueId)['checked'] = !(document.getElementById(this.uniqueId)['checked']);
							
							// add the application back to the user's list
							this.currentUser.applications.push(this.currentApplicationId);

							// fetch the licenses again (async)
							this.getLicenses();
						}
					}
		        	if(user.userId){
		        		console.log('user update processed')
		        		console.log(user)
		        	}
	        	}
	        },
	        error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
	        }

	    );
	}
	getUserDeleteAction():void {
		let first = true;
		this.userDelete = this.userStore.select('userDelete');
	    this.userDelete.subscribe(
	        message => {
	        	if(!first && message){
	        		if(message.error && message.error.message){
						toastr.error(this.translate.instant(message.error.message));
						return;
	        		}
	        		if(message.error){
						toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
						return;
	        		}
	        		if(message.response === "delete successful"){
						toastr.info(this.translate.instant('INFO_USER_DELETED'));
						this.onRefresh();
	        		}
	        	}
	        	first = false;
	        },
	        error => {
				toastr.error(this.translate.instant('ERROR_SOMETHING_BAD_HAPPENED'));
	        }

	    );
	}

	onSelect():void {
    	this.router.navigate(['user-administration/user-details', 17]);
	}

	onDeleteConfirm(user, dialogContent):void {
		// if the user has an admin license - only delete if another admin exists
		const userIndex = user.applications.indexOf('Spectrum Administration');
		if(userIndex > -1 && !this.hasAnotherAdmin(user)){
			toastr.error(this.translate.instant('ERROR_CANNOT_REMOVE_LICENSE'));
			return
		}
        this.dialogTitle = this.translate.instant('HEADING_DELETE_RECORD')
        this.dialogBody = this.translate.instant('INFO_OK_DELETE_RECORD') + user.name + '?';
        this.modalService.open(dialogContent).result.then((result) => {
            console.log(`Closed with: ${result}`)
			this.userStore.dispatch(this.userActions.deleteUser(user));
        }, (reason) => {
            console.log(`Dismissed ${reason}`);
        });   
	}


	hasAnotherAdmin(adminUser: UserBase):boolean {
    	return this.users.some(user => {
    		if(adminUser.userId == user.userId){
    			return false;
    		}
			const userIndex = user.applications.indexOf('Spectrum Administration');
			if(userIndex > -1){
				return true;
			}
			return false;

    	});
	}
	onAdd():void {
    	this.router.navigate(['user-administration/user-details', 0]);
	}
	onRefresh():void {
		this.getLicenses();
		this.getUsers();
	}

	onCheck(user: UserBase, application: Application):void {
		if(!user){
			return;
		}
		this.uniqueId = user.email + application.applicationId;
		this.currentApplicationId = application.applicationId;
		this.currentUser = user;

		const userIndex = user.applications.indexOf(application.applicationId);
		
		//remove license
		if (userIndex > -1) {
			// if the user removes an admin license - only delete if another admin exists
			if(application.applicationId == 'Spectrum Administration' && !this.hasAnotherAdmin(user)){
				toastr.error(this.translate.instant('ERROR_CANNOT_REMOVE_LICENSE'));
		        document.getElementById(this.uniqueId)['checked'] = true;
				return;
			}

    		user.applications.splice(userIndex, 1);
    		application.licensesUsed--;
			//send to host
			this.removeUserLicense(user, application.applicationId);	
		}else{
			if(application.licensesUsed + 1 > application.totalCount){
				toastr.error(this.translate.instant('ERROR_ALL_LICENSES_ASSIGNED'));
		        document.getElementById(this.uniqueId)['checked'] = false;
				return;
			}
			user.applications.push(application.applicationId);			
    		application.licensesUsed++;
			this.addUserLicense(user, application.applicationId);	
		}
	}
	hasLicense(userApplications, applicationId):boolean {
		if(!userApplications){
			return;
		}
		return userApplications.includes(applicationId);
	}
	getUserStatus(user){
		if(user.blocked){
			return this.translate.instant('STATUS_INACTIVE')
		}
		if(user.emailVerified){
			return this.translate.instant('STATUS_ACTIVE')
		}
		return this.translate.instant('STATUS_UNVERIFIED')
	}
	saveUser(user: UserBase):void {
		this.userStore.dispatch(this.userActions.saveUser(user));
	}
	addUserLicense(user: UserBase, applicationId:string):void {
		this.userStore.dispatch(this.userActions.addUserLicense([user.userId, applicationId]));
	}
	removeUserLicense(user: UserBase, applicationId:string):void {
		this.userStore.dispatch(this.userActions.removeUserLicense([user.userId, applicationId]));
	}
}
