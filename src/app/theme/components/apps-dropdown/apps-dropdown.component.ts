import { 
	Component, ViewEncapsulation, Input, Output, EventEmitter 
} from '@angular/core';
import { Router, Routes, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import * as _ from 'lodash';

import { AppsDropdownService } from './apps-dropdown.service';
import { GlobalState } from '../../../global.state';

@Component({
	selector: 'dc-apps-dropdown',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './apps-dropdown.component.scss' ],
	templateUrl: './apps-dropdown.component.html',
	providers: [ AppsDropdownService ],
})
export class AppsDropdown {
	@Input() navbar: Array<any> = [];

  // here we declare which routes we want to use as a menu in our sidebar
	public navbarRoutes: Array<any> = []; // we're creating a deep copy since we are going to change that object

	public navbarItems:any[];
	protected onRouteChange:Subscription;

	constructor(private router:Router, private service:AppsDropdownService, private state:GlobalState) {}

	public selectNavbarItemAndNotify():void {
		if (this.navbarItems) {
			this.navbarItems = this.service.selectNavbarItem(this.navbarItems);
			const item = this.service.getCurrentItem();
			if(item.selected){
				this.state.notifyDataChanged('menu.activeLink', item);				
			}
		}
	}
 
	public ngOnInit():void {

		this.onRouteChange = this.router.events.subscribe((event) => {

			if (event instanceof NavigationEnd) {
				if (this.navbarItems) {
					this.selectNavbarItemAndNotify();
				} else {
				// on page load we have to wait as event is fired before menu elements are prepared
					setTimeout(() => this.selectNavbarItemAndNotify());
				}
			}
		});


		this.navbarRoutes = _.cloneDeep(this.navbar)
		this.navbarItems = this.service.convertRoutesToNavbarItems(this.navbarRoutes);
	}

	public ngOnDestroy():void {
		this.onRouteChange.unsubscribe();
	}

}
