
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Auth } from './auth.service';
import { Location } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private auth: Auth, private router: Router, private location: Location) {}

	canActivate() {
		if(window.location.hash.includes('#access_token')){
			this.auth.hide();
			this.auth.lock.resumeAuth(window.location.hash, (error, authResult) => {
				if (error) return console.log(error);
				console.log('setUser from hash')
				this.auth.setUser(authResult);
				// hack to allow generic auth0 redirect url
				window.location.pathname = this.auth.getTenant();
				this.router.navigate(['/']);
			});

			return true;
		}

		if (window.location.hash.includes("#error")){
			console.log("/#error");
			this.auth.lock.resumeAuth(window.location.hash, (error, authResult) => {
				// hack - for some reason Edge won't handle the redirect correctly w/ the hash, so capture 
				//   the redirect and force the hash parse here, which will then let the Lock flow happen as expected
			});
			return false;
		}

		if (!this.auth.authIn && !this.auth.loggedIn()) {
			this.auth.login();
			return false;				
		}
		return true;
	}
}