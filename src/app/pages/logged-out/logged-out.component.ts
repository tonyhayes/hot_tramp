import { Component } from '@angular/core';


@Component({
	selector: 'logged-out',
	styleUrls: [ './logged-out.component.scss' ],
	templateUrl: './logged-out.component.html',

})
export class LoggedOut {


	constructor() {}

	onLogBackIn(){
		window.location.replace(this.getLogOffRedirect());
	}
	getLogOffRedirect() {
		const tenant = JSON.parse(localStorage.getItem('tenant'));
		if(window.location.hostname == 'localhost'){
			return window.location.protocol+'//'+window.location.hostname+':7000/'+ tenant;

		}
		return window.location.protocol+'//'+window.location.hostname+'/'+ tenant;

	};

}
