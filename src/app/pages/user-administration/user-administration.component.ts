import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { ADMIN_MENU } from './user-administration.menu';
import { ADMIN_NAVBAR } from './user-administration.navbar';
import { GlobalState } from '../../global.state';
import { TranslateService } from '../../translate';
import { Util } from '../../framework/helpers/util';

@Component({
	selector: 'user-administration',
	styleUrls: [ './user-administration.component.scss' ],
	templateUrl: './user-administration.component.html',
//	encapsulation: ViewEncapsulation.None,

})
export class UserAdministration implements OnInit {

	private menu: Array<any> = ADMIN_MENU;
	private navbar: Array<any> = ADMIN_NAVBAR;
	private homeRoute: string = '/user-administration/user-list';

	constructor( private router: Router, private state:GlobalState, private translate: TranslateService) {}

	ngOnInit() {
		Util.removeDomNuisances();
		this.state.notifyDataChanged('menu.activeLink', {title: this.translate.instant('USER_ADMINISTRATION')});				
		//register a route change listener on main component and scroll to top on route changes.
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
			jQuery('html, body').animate({scrollTop:0}, {duration:1000});
        });
    	this.router.navigate([this.homeRoute]);

	}

}
