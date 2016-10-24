import { Component, ViewEncapsulation } from '@angular/core';
@Component({
	selector: 'pages',
	encapsulation: ViewEncapsulation.None,
	styles: [],
	template: `
		<dc-sidebar></dc-sidebar>
		<dc-page-top></dc-page-top>
		<dc-navbar-top></dc-navbar-top>
		<div class="al-main" >
			<div class="al-content">
				<dc-content-top></dc-content-top>
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

	constructor() {}

	ngOnInit() {}
}
