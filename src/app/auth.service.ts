import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';
import { Router } from '@angular/router';
import { GlobalState } from './global.state';
import * as toastr from 'toastr';
import { TranslateService } from './translate';
import { AppLogoPipe } from './framework/pipes/app-logo/app-logo.pipe';
import { Util } from './framework/helpers/util';
import 'rxjs/add/operator/filter';

@Injectable()
export class Auth {
	// Configure Auth0
	tenant;
	authIn = false;


	domain = "dexchadev.auth0.com";
	lock = new Auth0Lock(this.getClientId(), this.domain, {
			allowSignUp: false,
			closable: false,
			autoClose: true,
			defaultDatabaseConnection: this.getTenant(),
  			theme: {
    			logo: this.getLogo(),
    			primaryColor: '#48A942',
			},
			languageDictionary: {
			   title: this.getTitle()
			},
  			auth: {
     			redirectUrl: this.getRedirect(),
     			responseType: 'token',
				params: {
					connection: this.getTenant(),
					scope: 'openid name email tenant_id applications user_id'
				}
			}
		});

	constructor(private router: Router, private state: GlobalState, private translate: TranslateService) {}

 	handleAuthentication(): void {
 		let self = this;
		this.authIn = false
    	this.lock.on('authenticated', (authResult) => {
    		console.log('authenticated')
  			this.authIn = true
   			this.lock.hide();
      		if (authResult && authResult.accessToken && authResult.idToken) {
        		this.setUser(authResult);
      		} else if (authResult && authResult.error) {
    	 		toastr.error(this.translate.instant(`Error: ${authResult.error}`));
      		}
      		window.location.pathname = this.tenant
    	});

		this.lock.on("authorization_error", function(error) {
			// Note: Edge has issues parsing the hash when Auth0 tries to redirect (on both success AND on error)
			//  This was not being called until we put a hack in auth-guard.service to "shim" the redirect and
			//  force it to parse the hash, which then fires this event as expected
            self.lock.show({
                flashMessage:{
                    type: 'error',
                    text: error.error_description
                }
            });
        });
  	}
	login() {
  		this.authIn = true
		this.lock.show();
	};
	hide() {
  		this.authIn = true
		this.lock.hide();
	};
	getLogo() {
		const logoLocation = new AppLogoPipe().transform('logo','svg');
		return '/' + logoLocation;
	};
	getTitle() {
        return this.state.getCurrent('app.APP_TITLE');
	};
	getTenant() {
		return this.tenant = JSON.parse(localStorage.getItem('tenant'));

	};

	getClientId() {
		//admin.dexchadev.com/mech-co"
		//hack to find the app
		const app = Util.getAppDetails()
		this.state.notify('app.API_REST_URL', app.API_REST_URL );
		this.state.notify('app.API_WEATHER_UNDERGROUND_URL', app.API_WEATHER_UNDERGROUND_URL );
		this.state.notify('app.API_DARKSKY_URL', app.API_DARKSKY_URL );
		this.state.notify('app.CLIENT_ID', app.CLIENT_ID );
		this.state.notify('app.APP_TITLE', app.APP_TITLE );
		this.state.notify('app.APP_NAME', app.APP_NAME );
        return this.state.getCurrent('app.CLIENT_ID');
	};

	getRedirect() {
		if(window.location.hostname == 'localhost'){
			return window.location.protocol+'//'+window.location.hostname+':7000/';

		}
		return window.location.protocol+'//'+window.location.hostname+'/';

	};
	setUser(authResult): void {
		localStorage.setItem('id_token', authResult.idToken);
		localStorage.setItem('access_token', authResult.accessToken);
		this.lock.getUserInfo(authResult.accessToken, (error: any, profile: any) => {
			if (error) {
				console.log(error);
				return;
			}
			this.state.notifyDataChanged('auth0.profilePicture', profile.picture);
			this.state.notify('auth0.userInfo', { name: profile.name, id: profile.identities[0].user_id });
			localStorage.setItem('profile', JSON.stringify(profile));
		});

	}
	getUser() {
		const accessToken = localStorage.getItem('access_token');
		this.lock.getUserInfo(accessToken, (error: any, profile: any) => {
			if (error) {
				console.log(error);
				return;
			}
			this.state.notifyDataChanged('auth0.profilePicture', profile.picture);
			this.state.notify('auth0.userInfo', { name: profile.name, id: profile.identities[0].user_id });
			localStorage.setItem('profile', JSON.stringify(profile));
			return { name: profile.name, id: profile.identities[0].user_id };
		});

	}
	getUserFromLocalStorage() {
		const profile = JSON.parse(localStorage.getItem('profile'));
		if(!profile){
			this.getUser();
			return;
		}
		this.state.notify('auth0.userInfo', { name: profile.name, id: profile.identities[0].user_id });
		return { name: profile.name, id: profile.identities[0].user_id };

	}
	authenticated() {
		// Check if there's an unexpired JWT
		// This searches for an item in localStorage with key == 'id_token'
		return tokenNotExpired();
	};
	loggedIn() {
		// Check if there's an unexpired JWT
		// This searches for an item in localStorage with key == 'id_token'
		return tokenNotExpired();
	};

	logout() {
		// Remove token and profile from localStorage
		localStorage.removeItem('profile');
		localStorage.removeItem('id_token');
		localStorage.removeItem('access_token');
		this.authIn = false;
		location.reload();
	};
}
