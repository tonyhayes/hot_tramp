import { Component, ViewEncapsulation } from '@angular/core';

import { GlobalState } from '../../../global.state';

@Component({
  	moduleId: module.id,
	selector: 'dc-page-top',
	styleUrls: [ 'page-top.component.scss' ],
	templateUrl: 'page-top.component.html',
	encapsulation: ViewEncapsulation.None
})
export class PageTop {

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
	}

	public scrolledChanged(isScrolled) {
		this.isScrolled = isScrolled;
	}
}
