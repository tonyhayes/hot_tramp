import { 
	Component, ViewEncapsulation, Input
} from '@angular/core';
//import { Router, Routes, NavigationEnd } from '@angular/router';
import { Routes } from '@angular/router';
//import { Subscription } from 'rxjs/Rx';

//import { GlobalState } from '../../../global.state';
import { MenuService } from '../../../services/menu.service';

@Component({
	selector: 'dc-navbar',
//	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './navbar.component.scss' ],
	templateUrl: './navbar.component.html',
})
export class Navbar {

	@Input() navbarRoutes:Routes = [];

	public navbarItems:any[];
//	protected onRouteChange:Subscription;

	constructor( public service:MenuService ) {
	}

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
		// 			// on page load we have to wait as event is fired before menu elements are prepared
		// 			setTimeout(() => this.selectNavbarItemAndNotify());
		// 		}
		// 	}
		// });
		this.navbarItems = this.service.convertRoutesToMenus(this.navbarRoutes);
	}

	public ngOnDestroy():void {
//		this.onRouteChange.unsubscribe();
	}

}
