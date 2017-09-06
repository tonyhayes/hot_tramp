import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { PROJECT_MANAGEMENT_MENU } from './project-management.menu';
import { PROJECT_MANAGEMENT_NAVBAR } from './project-management.navbar';
import { FIELD_MENU } from './field-report-list.menu';
import { GlobalState } from '../../global.state';
import { TranslateService } from '../../translate';
import { Util } from '../../framework/helpers/util';
import { MenuService } from '../../services';
import { Auth } from '../../auth.service';

@Component({
	selector: 'project-management',
	styleUrls: [ './project-management.component.scss' ],
	templateUrl: './project-management.component.html',
//	encapsulation: ViewEncapsulation.None,

})
export class ProjectManagement implements OnInit {

	menu: Array<any> = PROJECT_MANAGEMENT_MENU;
	fieldMenu: Array<any> = FIELD_MENU

	fieldMenuRoutes;
	navbar: Array<any> = PROJECT_MANAGEMENT_NAVBAR;
	homeRoute: string = '/project-management/dashboard';
	

	constructor( private router: Router, private state:GlobalState, private translate: TranslateService, private service:MenuService, private auth: Auth) {}

	ngOnInit() {
		// ensure user information is loaded into memory
		// fyi - the user information comes from auth0 and not from a dc data source.
		const userInfo = this.auth.getUserFromLocalStorage();
		this.fieldMenuRoutes = this.service.convertRoutesToMenus(this.fieldMenu);
		//ensure unnessasry elements are removed
		Util.removeDomNuisances();
		this.state.notifyDataChanged('menu.activeLink', {title: this.translate.instant('PROJECT_MANAGEMENT')});				
        this.state.subscribe('menu.resetMenu', (evt) => {
       		this.state.notifyDataChanged('menu.replaceMenu', PROJECT_MANAGEMENT_MENU);                
        });
        this.state.subscribe('menu.changeComponentMenu', (menu) => {
        	this.fieldMenu[0]['children'] = menu;
			this.fieldMenuRoutes = this.service.convertRoutesToMenus(this.fieldMenu);
        });
        this.state.subscribe('menu.componentMenuAddChild', (childObj) => {
        	if(!childObj){
        		return
        	}
        	this.fieldMenu = this.service.resetChildExpandedFlag(this.fieldMenu);
        	const path = `/project-management/${childObj.reportPath}`
			this.fieldMenu = this.service.addChildItem(
				this.fieldMenu, 
				path, 
				childObj.title,
				childObj.sortField,
				childObj.categoryId,
				childObj.attributeCount,
				childObj.expandCategory
			);
			this.fieldMenuRoutes = this.service.convertRoutesToMenus(this.fieldMenu);
        });
        this.state.subscribe('menu.componentMenuRemoveChild', (childObj) => {
        	if(!childObj){
        		return
        	}
        	const path = `/project-management/${childObj.reportPath}`
			this.fieldMenu = this.service.removeChildItem(this.fieldMenu, path);
			this.fieldMenuRoutes = this.service.convertRoutesToMenus(this.fieldMenu);
        });
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
        this.state.notify('menu.componentMenuClose', true);                
    }

}
