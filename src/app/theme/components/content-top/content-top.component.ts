import { Component, Input } from '@angular/core';

import { GlobalState } from '../../../global.state';

@Component({
	selector: 'dc-content-top',
	styleUrls: ['./content-top.component.scss'],
	templateUrl: './content-top.component.html',
})
export class ContentTop {

	@Input() homeRoute: string;
	public activePageTitle:string = '';

	constructor(private state:GlobalState) {
		this.state.subscribe('menu.activeLink', (activeLink) => {
			if (activeLink) {
				this.activePageTitle = activeLink.title;
			}
		});
	}
}
