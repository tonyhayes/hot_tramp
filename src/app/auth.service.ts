// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import Auth0Lock from 'auth0-lock';

@Injectable()
export class Auth {
  	// Configure Auth0
	cid = "YOUR-AUTH0-CLIENTID";
	domain = "YOUR-AUTH0-DOMAIN.auth0.com";
  	lock = new Auth0Lock(this.cid, this.domain, {
			auth: {
				params: {
					scope: 'openid name app_metadata'
				}
			}
		});

  	constructor() {
		// Add callback for lock `authenticated` event
		this.lock.on("authenticated", (authResult) => {
	  		localStorage.setItem('id_token', authResult.idToken);
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

  	public logout() {
		// Remove token from localStorage
		localStorage.removeItem('id_token');
  	};
}
