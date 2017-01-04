import { Component, ViewEncapsulation, Input, Output, EventEmitter 
} from '@angular/core';
import { Router, Routes, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { MenuService } from './menu.service';
import { GlobalState } from '../../../global.state';

@Component({
	selector: 'dc-menu',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./menu.component.scss'],
	templateUrl: './menu.component.html',
	providers: [MenuService]
})
export class Menu {

	@Input() menuRoutes:Routes = [];
	@Input() sidebarCollapsed:boolean = false;
	@Input() menuHeight:number;

	@Output() expandMenu = new EventEmitter<any>();
	@Output() collapseMenu = new EventEmitter<any>();

	public menuItems:any[];
	public showHoverElem:boolean;
	public hoverElemHeight:number;
	public hoverElemTop:number;
	protected onRouteChange:Subscription;
	public outOfArea:number = -200;

	constructor(private router:Router, private service:MenuService, private state:GlobalState) {
		this.onRouteChange = this.router.events.subscribe((event) => {

			if (event instanceof NavigationEnd) {
				if (this.menuItems) {
					this.selectMenuAndNotify();
				} else {
					// on page load we have to wait as event is fired before menu elements are prepared
					setTimeout(() => this.selectMenuAndNotify());
				}
			}
		});
	}

	public selectMenuAndNotify():void {
		if (this.menuItems) {
			this.menuItems = this.service.selectMenuItem(this.menuItems);
			const item = this.service.getCurrentItem();
			if(item.selected){
				this.state.notifyDataChanged('menu.activeLink', item);				
			}
			this.closeMenu();
		}
	}

	public ngOnInit():void {
		this.menuItems = this.service.convertRoutesToMenus(this.menuRoutes);
	}

	public ngOnDestroy():void {
		this.onRouteChange.unsubscribe();
	}
	public closeMenu():void {
		this.collapseMenu.emit(null);
	}

	public hoverItem($event):void {
		this.showHoverElem = true;
		this.hoverElemHeight = $event.currentTarget.clientHeight;
		// TODO: get rid of magic 66 constant
		this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 66;
	}

	public toggleSubMenu($event):boolean {
		const submenu = jQuery($event.currentTarget).next();
		if (this.sidebarCollapsed) {
			this.expandMenu.emit(null);
			if (!$event.item.expanded) {
				$event.item.expanded = true;
			}
		} else {
			$event.item.expanded = !$event.item.expanded;
			submenu.slideToggle();
		}

		return false;
	}
}
