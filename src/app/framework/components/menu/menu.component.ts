import { Component, ViewEncapsulation, Input, Output, EventEmitter 
} from '@angular/core';
import { Router, Routes, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { GlobalState } from '../../../global.state';
import { MenuService } from '../../../services/menu.service';

@Component({
	selector: 'dc-menu',
//	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './menu.component.scss' ],
	templateUrl: './menu.component.html',
})
export class Menu {

	@Input() menuRoutes:Routes = [];
	@Input() componentRoutes:Routes = [];
	@Input() sidebarCollapsed:boolean = false;
	@Input() menuHeight:number;

	@Output() expandMenu = new EventEmitter<any>();
	@Output() collapseMenu = new EventEmitter<any>();

	menuItems:any[];
	componentMenu = false
	jobNumber:number
	jobId:string
	jobDate:string
	showHoverElem:boolean;
	hoverElemHeight:number;
	hoverElemTop:number;
	onRouteChange:Subscription;
	outOfArea:number = -200;

	constructor(private router:Router, public service:MenuService, public state:GlobalState) {}

	get menuRouteItems():Routes {
	    return this.menuItems;
	}
	get menuComponentItems():Routes {
	    return this.componentRoutes;
	}
//	public selectMenuAndNotify():void {
//		if (this.menuItems.length) {
			// this.menuItems = this.service.selectMenuItem(this.menuItems);
			// const item = this.service.getCurrentItem();
			// if(item.selected){
			// 	this.state.notifyDataChanged('menu.activeLink', item);				
			// }
//			this.closeMenu();
//		}
//	}

	public ngOnInit():void {
		this.onRouteChange = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.closeMenu();
			}
			if (event instanceof NavigationStart) {
				//                                                     report id                     cat  log
				//"/project-management/field-report-detail/notes/2fa329f9-f1d2-4a56-9fbc-0bfd88c84c4f/1/1498079010090"
                // make this the current selected item
				this.state.notifyDataChanged('menu.componentItemSelected', event.url);
			}
		});
		this.menuItems = this.service.convertRoutesToMenus(this.menuRoutes);
        this.state.subscribe('job.activeJob', (job) => {
        	if(job && job.jobCode){
        		this.jobNumber = job.jobCode;
        		this.jobId = job.id;
        		this.jobDate = job.forDay;
	        	this.componentMenu = true;
				if (this.sidebarCollapsed) {
					this.expandMenu.emit(null);
				} 
        	}else{
        		this.jobNumber = null;
        		this.jobId = null;
        		this.jobDate = null;
	        	this.componentMenu = false;
				if (!this.sidebarCollapsed) {
					this.closeMenu();
				} 

        	}
        });
        this.state.subscribe('menu.componentMenuOpen', (job) => {
        	if(job){
        		this.jobNumber = job;
	        	this.componentMenu = true;
				if (this.sidebarCollapsed) {
					this.expandMenu.emit(null);
				} 
        	}
        });
        this.state.subscribe('menu.componentMenuClose', (e) => {
        	this.componentMenu = false;
			if (!this.sidebarCollapsed) {
				this.closeMenu();
			} 
        });
        this.state.subscribe('menu.componentMenuCloseActiveJob', (job) => {
        	if(job){
        		this.jobNumber = job;
        	}
			if (!this.sidebarCollapsed) {
				this.closeMenu();
			} 
        });
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
	public toggleSubMenuWithHeader($event):boolean {
		if (this.sidebarCollapsed) {
			this.expandMenu.emit(null);
			if (!$event.item.expanded) {
				$event.item.expanded = true;
			}
		} else {
			$event.item.expanded = !$event.item.expanded;
			if($event.item.children){
				$event.item.children.forEach( child => {
					child.expanded = $event.item.expanded;
				})				
			}
		}

		return false;
	}
	public onChildIconClick($event){
		this.state.notifyAndForget('menu.componentChildIconClicked', $event);
	}
}
