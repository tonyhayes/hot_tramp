import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonModule } from "@angular/common"

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';

import { ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserAdministrationActions } from '../../../../actions';
import { AppState } from '../../../../reducers';

@Component({
	selector: 'user-list',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './user-list.component.scss' ],
	templateUrl: './user-list.component.html',
//  	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UserList implements OnInit {

	private userList: Observable<any>;
	private users:Array<any>
	private licences:Object
 	private anyErrors: boolean;
  	private finished: boolean;
	private homeRoute: string = '/user-administration/user-list';
	private endPoint:string = '/api/projectmanagement/1'
	private countSpectrum = 7;
	private countField = 6;
	private countPJ = 5;
	private searchText:string = "";

	constructor(private userActions: UserAdministrationActions, private userStore: Store<AppState>, private router: Router ) {}

	ngOnInit() {
		this.getUsers();		
	}

	get filteredUserList() {
	    if (this.searchText && this.searchText.length > 1) {
	      	const lsearchText = this.searchText.toLowerCase();
	      	return this.users.filter((a) =>
	        	a.firstName.toLowerCase().includes(lsearchText) ||
	        	a.lastName.toLowerCase().includes(lsearchText) ||
	        	a.username.toLowerCase().includes(lsearchText) ||
	        	a.email.toLowerCase().includes(lsearchText)
	      	);
	    }
	    return this.users;
	}
	private getUsers():void {

		this.userStore.dispatch(this.userActions.loadUsers(this.endPoint));
		this.userList = this.userStore.select('userAdministration');
	    this.userList.subscribe(
	        value => {
	        	if(value.users){
					this.users = value.users;
					this.licences = value.licences;
					console.log(this.users)
					this.finished = true;
	        	}
	        },
	        error => this.anyErrors = true,
	        
	    );
	}

	private onSubmit(values:FormGroup):void {
		console.log(JSON.stringify(values));
	}
	private onFilter(user):boolean {
		console.log(user);
		return true;
	}
	private onSelect():void {
    	this.router.navigate(['user-administration/user-details', 17]);
	}
	private onCheck(user, app):void {
		if(app == 'spectrum'){
			this.countSpectrum--
		}
		if(app == 'pj'){
			this.countPJ--
		}
		if(app == 'field'){
			this.countField--
		}
	}
	private getLicenseCount(app):number {
		if(app == 'spectrum'){
			return this.countSpectrum
		}
		if(app == 'pj'){
			return this.countPJ
		}
		if(app == 'field'){
			return this.countField
		}
 	}

	private questionsChanged(questions):void {
		this.userStore.dispatch(this.userActions.saveUsers(this.endPoint, questions));
	}


}
