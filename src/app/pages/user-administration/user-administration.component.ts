import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ADMIN_MENU } from './user-administration.menu';
import { ADMIN_NAVBAR } from './user-administration.navbar';

@Component({
	selector: 'user-administration',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './user-administration.component.scss' ],
	templateUrl: './user-administration.component.html',

})
export class UserAdministration implements OnInit {

	private menu: Array<any> = ADMIN_MENU;
	private navbar: Array<any> = ADMIN_NAVBAR;
	private homeRoute: string = '/user-administration/user-list';

	constructor( private router: Router ) {}

	ngOnInit() {
    	this.router.navigate([this.homeRoute]);
	}

}
