import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { PROJECT_MANAGEMENT_ADMINISTRATION_MENU } from './project-management-administration.menu';
import { PROJECT_MANAGEMENT_ADMINISTRATION_NAVBAR } from './project-management-administration.navbar';
import { GlobalState } from '../../global.state';
import { TranslateService } from '../../translate';
import { Util } from '../../framework/helpers/util';

@Component({
	selector: 'project-management-administration',
	styleUrls: [ './project-management-administration.component.scss' ],
	templateUrl: './project-management-administration.component.html',
//	encapsulation: ViewEncapsulation.None,

})
export class ProjectManagementAdministration implements OnInit {

	menu: Array<any> = PROJECT_MANAGEMENT_ADMINISTRATION_MENU;

	navbar: Array<any> = PROJECT_MANAGEMENT_ADMINISTRATION_NAVBAR;
	homeRoute: string = '/project-management-administration/dashboard';
	

	constructor( private router: Router, private state:GlobalState, private translate: TranslateService) {}

	ngOnInit() {
		// ensure user information is loaded into memory
		//ensure unnessasry elements are removed
		Util.removeDomNuisances();
		this.state.notifyDataChanged('menu.activeLink', {title: this.translate.instant('PROJECT_MANAGEMENT_ADMINISTRATION')});				
		//register a route change listener on main component and scroll to top on route changes.
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
			jQuery('html, body').animate({scrollTop:0}, {duration:1000});
        });
    	this.router.navigate([this.homeRoute]);

	}
    ngOnDestroy():void {
    }

}
