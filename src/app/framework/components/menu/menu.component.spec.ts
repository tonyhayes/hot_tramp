// Load the implementations that should be tested
import { MENU } from '../../../../app/app.menu';
import { Router, Routes, NavigationEnd } from '@angular/router';

import { Menu } from './menu.component';
import { MenuService } from '../../../services/menu.service';
import { GlobalState } from '../../../global.state';
import { routing } from '../../../pages/pages.routing';
import {} from 'jasmine'

describe('Menu', () => {
	// provide our implementations or mocks to the dependency injector
	const testRouterObj = {
		events:{
			subscribe: ()=>{}
		},
		url:'dashboard',
		route: {
			paths:[ 'tony']
		}		
	}
	const testOnRouteChangeObj = {
		unsubscribe: ()=>{}
	}
	const menuItems = [
	{
		"title": "Dashboard",
		"icon": "ion-android-home",
		"selected": true,
		"order": 0,
		"route": {
			"path": "dashboard",
			"data": {},
			"paths": [
				"pages",
				"dashboard"
			]
		},
		"url": "#/pages/dashboard",
		"target": ""
	},
	{
		"title": "External Link",
		"url": "http://www.dexterchaney.com/",
		"icon": "ion-android-exit",
		"order": 100,
		"target": "_blank",
		"route": {
			"path": "",
			"data": {},
			"paths": [
				"pages",
				""
			]
		},
		"selected": false
	}
]
	const gs = new GlobalState();
	const ms = new MenuService(null);
	const mn = new Menu(null, ms, gs);
//	mn.service.router.url = 'dashboard';

	it('should define Menu', () => {
	  	expect(Menu).toBeDefined();
	});
	it('should construct Menu', () => {
	  	expect(mn).toBeDefined();
	});
// 	it('should run ngOnDestroy', () => {
// //		mn.onRouteChange = testOnRouteChangeObj; 
// //		mn.ngOnDestroy();
// 	  	expect(mn).toBeDefined();
// 	});
	// it('should run ngOnInit', () => {
	// 	mn.menuRoutes = menuItems; 
	// 	mn.ngOnInit();
	//   	expect(mn.menuItems.length).toEqual(0);
	// });
	// it('should run selectMenuAndNotify - empty set', () => {
	// 	mn.menuItems = []; 
	// 	mn.selectMenuAndNotify();
	//   	expect(mn.menuItems.length).toEqual(0);
	// });
	// it('should run selectMenuAndNotify - null set', () => {
	// 	mn.menuItems = null; 
	// 	mn.selectMenuAndNotify();
	//   	expect(mn.menuItems).toEqual(null);
	// });
// 	it('should run selectMenuAndNotify - full set', () => {
// 		mn.menuItems = menuItems; 
// //		mn.service.router = {
// 			// 	url:'dashboard',
// 			// 	createUrlTree:  ()=>{},
// 			// 	isActive:  ()=>{},

// 			// };
// 		mn.selectMenuAndNotify();
// 	  	expect(mn.menuItems.length).toEqual(2);
// 	});
	it('should run closeMenu', () => {
		mn.closeMenu();
	  	expect(mn.collapseMenu.closed).toEqual(false);
	});
	it('should run hoverItem', () => {
		const e = {
			currentTarget:{
				clientHeight: 47,
				getBoundingClientRect: ()=>{
					return {top: 67}
				}
			}
		}
		mn.hoverItem(e);
	  	expect(mn.showHoverElem).toEqual(true);
	  	expect(mn.hoverElemHeight).toEqual(47);
	  	expect(mn.hoverElemTop).toEqual(1);
	});
	it('should run toggleSubMenu = menu collapsed - true', () => {
		const e = {
			currentTarget:{
				clientHeight: 47,
				getBoundingClientRect: ()=>{
					return {top: 67}
				}
			},
			item:{

			}
		}
		mn.sidebarCollapsed = true;
	  	expect(mn.toggleSubMenu(e)).toEqual(false);
	});
	it('should run toggleSubMenu = menu collapsed - false', () => {
		const e = {
			currentTarget:{
				clientHeight: 47,
				getBoundingClientRect: ()=>{
					return {top: 67}
				}
			},
			item:{

			}
		}
		mn.sidebarCollapsed = false;
	  	expect(mn.toggleSubMenu(e)).toEqual(false);
	});


});