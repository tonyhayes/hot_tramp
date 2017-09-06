import { Component } from '@angular/core';
import { GlobalState } from '../../global.state';


@Component({
	selector: 'page-not-found',
	styleUrls: [ './page-not-found.component.scss' ],
	templateUrl: './page-not-found.component.html',

})
export class PageNotFound {


	constructor(private state:GlobalState) {}

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
	public signOut() {
		this.state.notifyDataChanged('logout', true);
	}

}
