import { Component, ViewEncapsulation } from '@angular/core';
import { PAGES_MENU } from './pages.menu';
import { PAGES_NAVBAR } from './pages.navbar';
@Component({
	selector: 'pages',
//	encapsulation: ViewEncapsulation.None,
	styles: [],
	template: `
		<dc-sidebar [menu]="menu"></dc-sidebar>
		<dc-page-top [homeRoute]="homeRoute" [navbar]="navbar"></dc-page-top>
		<dc-navbar-top [navbar]="navbar"></dc-navbar-top>
		<div class="al-main" >
			<div class="al-content">
				<dc-content-top [homeRoute]="homeRoute"></dc-content-top>
				<router-outlet></router-outlet>
			</div>
		</div>
		<dc-footer></dc-footer>
		<dc-back-top position="200"></dc-back-top>
		`
})
export class Pages {
	homeRoute: string = '/user-administration/user-list'
	menu: Array<any> = PAGES_MENU;
	navbar: Array<any> = PAGES_NAVBAR;

	constructor() {}

}
