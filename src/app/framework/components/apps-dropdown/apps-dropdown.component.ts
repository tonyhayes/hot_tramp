import { 
	Component, ViewEncapsulation, Input 
} from '@angular/core';
//import { Router, Routes, NavigationEnd } from '@angular/router';
//import { Subscription } from 'rxjs/Rx';

//import * as _ from 'lodash';

//import { GlobalState } from '../../../global.state';
import { MenuService } from '../../../services/menu.service';

@Component({
	selector: 'dc-apps-dropdown',
//	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './apps-dropdown.component.scss' ],
	templateUrl: './apps-dropdown.component.html',
})
export class AppsDropdown {
	@Input() navbar: Array<any> = [];

  // here we declare which routes we want to use as a menu in our sidebar
	public navbarRoutes: Array<any> = []; // we're creating a deep copy since we are going to change that object

	public navbarItems:any[];
//	protected onRouteChange:Subscription;

	constructor( public service:MenuService ) {}

	// public selectNavbarItemAndNotify():void {
	// 	if (this.navbarItems) {
	// 		this.navbarItems = this.service.selectMenuItem(this.navbarItems);
	// 		const item = this.service.getCurrentItem();
	// 		if(item.selected){
	// 			this.state.notifyDataChanged('menu.activeLink', item);				
	// 		}
	// 	}
	// }
 
	public ngOnInit():void {

		// this.onRouteChange = this.router.events.subscribe((event) => {

		// 	if (event instanceof NavigationEnd) {
		// 		if (this.navbarItems) {
		// 			this.selectNavbarItemAndNotify();
		// 		} else {
		// 		// on page load we have to wait as event is fired before menu elements are prepared
		// 			setTimeout(() => this.selectNavbarItemAndNotify());
		// 		}
		// 	}
		// });


		this.navbarRoutes = /*.cloneDeep(*/this.navbar/*)*/
		this.navbarItems = this.service.convertRoutesToMenus(this.navbarRoutes);
	}

	public ngOnDestroy():void {
//		this.onRouteChange.unsubscribe();
	}

}
