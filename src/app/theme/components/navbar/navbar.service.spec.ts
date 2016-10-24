import { Router, Routes } from '@angular/router';

import { NAVBAR } from '../../../../app/app.navbar';
import { NavbarService } from './navbar.service';

describe('NavbarService', () => {
	// provide our implementations or mocks to the dependency injector

	const ns = new NavbarService(Router);
	const testObj = {
		selected: null,
		url: '#tony',		
		route: {
			paths:[ 'tony']
		}		
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
	const prepare = {
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
	}
}
	it('should define NavbarService', () => {
	  	expect(NavbarService).toBeDefined();
	});
	it('should construct NavbarService', () => {
	  	expect(ns).toBeDefined();
	});
	it('should get true from selected', () => {
		ns.router = {
				url:'tony',
				createUrlTree:  ()=>{},
				isActive:  ()=>{ return true },

			};
		const testObjReturn = ns.selectItem(testObj);		
	  	expect(testObjReturn.selected).toEqual(true);

	});
	it('should get items from convertRoutesToMenus', () => {
		const testObjReturn = ns.convertRoutesToNavbarItems(navbarItems);
		console.log(testObjReturn)
	  	expect(testObjReturn.length).toEqual(0);

	});
	it('should get from getCurrentItem', () => {
		ns.currentNavbarItem = {item:'tones'};
		const testObjReturn = ns.getCurrentItem();		
	  	expect(testObjReturn.item).toEqual('tones');

	});
	it('should get currentNavbarItem from selectNavbarItem', () => {
		ns.router = {
				url:'dashboard',
				createUrlTree:  ()=>{},
				isActive:  ()=>{ return true },

			};
		const testObjReturn = ns.selectNavbarItem(navbarItems);
	  	expect(ns.currentNavbarItem.title).toEqual('External Link');
	  	expect(testObjReturn.length).toEqual(2);

	});
	it('should get items from skipEmpty', () => {
		const testObjReturn = ns.skipEmpty(NAVBAR);
	  	expect(testObjReturn.length).toEqual(1);

	});
	it('should get items from convertArrayToItems', () => {
		const testObjReturn = ns.convertArrayToItems(navbarItems);
		console.log(testObjReturn)
	  	expect(testObjReturn.length).toEqual(2);

	});
	it('should get items from convertObjectToItem', () => {
		const testObjReturn = ns.convertObjectToItem(NAVBAR);
		console.log(testObjReturn)
	  	expect(testObjReturn.route[0].path).toEqual('pages');

	});
	it('should get items from prepareItem', () => {
		ns.router.createUrlTree = ()=>{return 'tony'};
		ns.router.serializeUrl = ()=>{return 'tony'};
	  	const preparedItemObj = ns.prepareItem(prepare)
	  	expect(preparedItemObj.title).toEqual('Dashboard');

	});
	it('should false from selected', () => {
		ns.router = {
				url:'tones',
				createUrlTree:  ()=>{},
				isActive:  ()=>{ return false },

			};
		const testObjReturn = ns.selectItem(testObj);		
	  	expect(testObjReturn.selected).toEqual(false);

	});


});