import { 
	Component, ViewEncapsulation, Input, Output, EventEmitter 
} from '@angular/core';
import { Router, Routes, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { NavbarService } from './navbar.service';
import { GlobalState } from '../../../global.state';

@Component({
  	moduleId: module.id,
	selector: 'dc-navbar',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['navbar.component.scss'],
	templateUrl: 'navbar.component.html',
  	providers: [NavbarService]
})
export class Navbar {

	@Input() navbarRoutes:Routes = [];

	public navbarItems:any[];
	protected onRouteChange:Subscription;

	constructor(private router:Router, private service:NavbarService, private state:GlobalState) {
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
	}

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
		this.navbarItems = this.service.convertRoutesToNavbarItems(this.navbarRoutes);
	}

	public ngOnDestroy():void {
		this.onRouteChange.unsubscribe();
	}

}
