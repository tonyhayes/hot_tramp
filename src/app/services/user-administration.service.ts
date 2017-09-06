import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response }          from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import * as toastr from 'toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/observable/of';
import { UserBase, LicenseBase, Application } from '../pages/user-administration';
import { GlobalState } from '../global.state';

@Injectable()
export class UserAdministrationService {
	protected usersUrl : string =  'users/';
   	protected licensesUrl : string =  'licenses/';
  	private user:UserBase ; 

	constructor (private authHttp: AuthHttp, private state: GlobalState) {}

	getBaseUrl(): string {
        return this.state.getCurrent('app.API_REST_URL');
	}

	getUsers(): Observable<UserBase[]> {
		return this.authHttp.get(this.getBaseUrl() + this.usersUrl)
			.map(res => res.json())
			.map((users: UserBase[]) => {
				return users
			})
	    	.catch(error => {
	    		console.log('catch')
	    		return Observable.of(error.json())
	    	})
	}
	addUser(user:UserBase): Observable<any> {
		return this.authHttp.post(this.getBaseUrl() + this.usersUrl, user)
			.map(res => res.json())
			.map((user: UserBase) => {
				return {response: user}
			})
        	.catch(error => {
        		console.log('catch')
        		return Observable.of(error.json())
        	})
	}
	deleteUser(user:UserBase): Observable<any> {
		return this.authHttp.delete(this.getBaseUrl() + this.usersUrl + user.userId)
			.map(res => res.json())
			.map((message: string) => {
				message = "delete successful";
				return {response: message}
			})
        	.catch(error => {
        		console.log('catch')
        		return Observable.of(error.json())
        	})
	}
	getUser():UserBase {
		return this.user
	}
	getLicenses(): Observable<Application[]> {
		return this.authHttp.get(this.getBaseUrl() + this.licensesUrl)
			.map(res => res.json())
			.map((licenses:LicenseBase) => {
				return  licenses.applications;
			})
        	.catch(error => {
        		console.log('catch')
        		return Observable.of(error.json())
        	})

	}

	saveUsers(user:UserBase) {
		const endpoint = this.getBaseUrl() + this.usersUrl + user.userId + '/applications/'
		return this.authHttp.post(endpoint, {applications: user.applications})
			.map(res => res.json())
        	.catch(error => {
        		console.log('catch')
        		return Observable.of(error.json())
        	})
	}
	addUserLicense(license:any[]) {
		const endpoint = this.getBaseUrl() + this.usersUrl + license[0] + '/applications/'+ license[1]
		return this.authHttp.post(endpoint, {})
			.map(res => res.json())
        	.catch(error => {
        		console.log('catch')
        		return Observable.of(error.json())
        	})
	}
	removeUserLicense(license:any[]) {
		const endpoint = this.getBaseUrl() + this.usersUrl + license[0] + '/applications/'+ license[1]
		return this.authHttp.delete(endpoint)
			.map(res => res.json())
        	.catch(error => {
        		console.log('catch')
        		return Observable.of(error.json())
        	})
	}
	saveUser(user:UserBase):UserBase {
			return this.user = user;
	}

}
