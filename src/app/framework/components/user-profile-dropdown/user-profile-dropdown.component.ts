import { Component, ViewEncapsulation, Input } from '@angular/core';

import { GlobalState } from '../../../global.state';

@Component({
	selector: 'dc-user-profile-dropdown',
	styleUrls: [ './user-profile-dropdown.component.scss' ],
	templateUrl: './user-profile-dropdown.component.html',
//	encapsulation: ViewEncapsulation.None
})
export class UserProfileDropdown {

	@Input() avatar: string;

	constructor(private state:GlobalState) {}

	public signOut() {
		this.state.notifyDataChanged('logout', true);
		// cancel the href
		return false;
	}

}
