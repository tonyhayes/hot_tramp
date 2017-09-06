import { Component, ViewEncapsulation, Input } from '@angular/core';

import { GlobalState } from '../../../global.state';

@Component({
	selector: 'dc-page-top',
	styleUrls: [ './page-top.component.scss' ],
	templateUrl: './page-top.component.html',
	encapsulation: ViewEncapsulation.None
})
export class PageTop {

	@Input() homeRoute: string;
	@Input() navbar: Array<any> = [];
	@Input() hideMenuToggle: boolean = false;
	@Input() avatar: string;
	public isScrolled:boolean = false;
	public isMenuCollapsed:boolean = false;

	constructor(private state:GlobalState) {
		this.state.subscribe('menu.isCollapsed', (isCollapsed) => {
			this.isMenuCollapsed = isCollapsed;
		});
	}

	public toggleMenu() {
		this.isMenuCollapsed = !this.isMenuCollapsed;
		this.state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
		return false;
	}

	public scrolledChanged(isScrolled) {
		this.isScrolled = isScrolled;
	}
}
