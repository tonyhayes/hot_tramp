// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';
import { Router } from '@angular/router';
@Injectable()
export class Auth {
  	// Configure Auth0
	cid = "ti";
	domain = "iu";
  	lock = new Auth0Lock(this.cid, this.domain, {
			auth: {
				params: {
					scope: 'openid name app_metadata'
				}
			}
		});

  	constructor(private router: Router) {
		// Add callback for lock `authenticated` event
		this.lock.on("authenticated", (authResult:any) => {
	  		localStorage.setItem('id_token', authResult.idToken);

	      	this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
	        	if (error) {
	          		console.log(error);
	        	}

	        	localStorage.setItem('profile', JSON.stringify(profile));
	      	});

	      	this.lock.hide();


		});
  	}

  	public login() {
		// Call the show method to display the widget.
		this.lock.show();
  	};

  	public authenticated() {
		// Check if there's an unexpired JWT
		// This searches for an item in localStorage with key == 'id_token'
		return tokenNotExpired();
  	};
  	public loggedIn() {
		// Check if there's an unexpired JWT
		// This searches for an item in localStorage with key == 'id_token'
		return tokenNotExpired();
  	};

  	public logout() {
		// Remove token and profile from localStorage
   		localStorage.removeItem('profile');
		localStorage.removeItem('id_token');
		// Send the user back to the dashboard after logout
		location.reload();
//    	this.router.navigateByUrl('');
  	};
}
