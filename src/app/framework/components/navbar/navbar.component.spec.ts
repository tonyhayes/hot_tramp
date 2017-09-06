// Load the implementations that should be tested
import { NAVBAR } from '../../../../app/app.navbar';
import { Router, Routes, NavigationEnd } from '@angular/router';

import { Navbar } from './navbar.component';
import { MenuService } from '../../../services/menu.service';
//import { GlobalState } from '../../../global.state';
import { routing } from '../../../pages/pages.routing';
import {} from 'jasmine'

describe('Navbar', () => {
	// provide our implementations or mocks to the dependency injector
	const testRouterObj = {
		events:{
			subscribe: ()=>{},
		},
		url:'dashboard',
		route: {
			paths:[ 'tony']
		}		
	}
	const testOnRouteChangeObj = {
		unsubscribe: ()=>{}
	}
	const navbarItems = [
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
	const ns = new MenuService(null);
	const nb = new Navbar(ns);
//	nb.service.router.url = 'dashboard';

	it('should define Navbar', () => {
	  	expect(Navbar).toBeDefined();
	});
	it('should construct Navbar', () => {
	  	expect(nb).toBeDefined();
	});
	it('should run ngOnDestroy', () => {
//		nb.onRouteChange = testOnRouteChangeObj; 
		nb.ngOnDestroy();
	  	expect(nb).toBeDefined();
	});
	it('should run ngOnInit', () => {
		nb.navbarRoutes = navbarItems; 
		nb.ngOnInit();
	  	expect(nb.navbarItems.length).toEqual(0);
	});
	// it('should run selectNavbarItemAndNotify - empty set', () => {
	// 	nb.navbarItems = []; 
	// 	nb.selectNavbarItemAndNotify();
	//   	expect(nb.navbarItems.length).toEqual(0);
	// });
	// it('should run selectNavbarItemAndNotify - null set', () => {
	// 	nb.navbarItems = null; 
	// 	nb.selectNavbarItemAndNotify();
	//   	expect(nb.navbarItems).toEqual(null);
	// });
	// it('should run selectNavbarItemAndNotify - full set', () => {
	// 	nb.navbarItems = navbarItems; 
	// 	// nb.service.router = {
	// 	// 		url:'dashboard',
	// 	// 		createUrlTree:  ()=>{},
	// 	// 		isActive:  ()=>{},

	// 	// 	};
	// 	nb.selectNavbarItemAndNotify();
	//   	expect(nb.navbarItems.length).toEqual(2);
	// });


});