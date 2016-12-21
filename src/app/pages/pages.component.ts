import { Component, ViewEncapsulation } from '@angular/core';
import { PAGES_MENU } from './pages.menu';
import { PAGES_NAVBAR } from './pages.navbar';
@Component({
	selector: 'pages',
	encapsulation: ViewEncapsulation.None,
	styles: [],
	template: `
		<dc-sidebar [menu]="menu"></dc-sidebar>
		<dc-page-top [navbar]="navbar"></dc-page-top>
		<dc-navbar-top [navbar]="navbar"></dc-navbar-top>
		<div class="al-main" >
			<div class="al-content">
				<dc-content-top [homeRoute]="homeRoute"></dc-content-top>
				<router-outlet></router-outlet>
			</div>
		</div>
		<footer class="al-footer clearfix">
			<div class="al-footer-right">Created with <i class="ion-social-angular"></i><i class="ion-social-html5"></i></div>
			<div class="al-footer-main clearfix">
				<div class="al-copy">&copy; <a href="http://dexterchaney.com">Dexter+Chaney</a> 2016</div>
			</div>
		</footer>
		<dc-back-top position="200"></dc-back-top>
		`
})
export class Pages {
	homeRoute: string = '/pages/dashboard'
	menu: Array<any> = PAGES_MENU;
	navbar: Array<any> = PAGES_NAVBAR;

	constructor() {}

	ngOnInit() {}
}
