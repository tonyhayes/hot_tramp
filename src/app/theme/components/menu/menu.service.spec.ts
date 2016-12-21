import { Router, Routes } from '@angular/router';

import { PAGES_MENU } from '../../../pages/pages.menu';
import { MenuService } from './menu.service';

describe('MenuService', () => {
	// provide our implementations or mocks to the dependency injector

	const ms = new MenuService(Router);
	const testObj = {
		selected: null,
		url: '#tony',		
		route: {
			paths:[ 'tony']
		}		
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
	it('should define MenuService', () => {
	  	expect(MenuService).toBeDefined();
	});
	it('should construct MenuService', () => {
	  	expect(ms).toBeDefined();
	});
	it('should get true from selected', () => {
		ms.router = {
				url:'tony',
				createUrlTree:  ()=>{},
				isActive:  ()=>{ return true },

			};
		const testObjReturn = ms.selectItem(testObj);		
	  	expect(testObjReturn.selected).toEqual(true);

	});
	it('should get items from convertRoutesToMenus', () => {
		const testObjReturn = ms.convertRoutesToMenus(menuItems);
	  	expect(testObjReturn.length).toEqual(0);

	});
	it('should get from getCurrentItem', () => {
		ms.currentMenuItem = {item:'tones'};
		const testObjReturn = ms.getCurrentItem();		
	  	expect(testObjReturn.item).toEqual('tones');

	});
	it('should get currentMenuItem from selectMenuItem', () => {
		ms.router = {
				url:'dashboard',
				createUrlTree:  ()=>{},
				isActive:  ()=>{ return true },

			};
		const testObjReturn = ms.selectMenuItem(menuItems);
	  	expect(ms.currentMenuItem.title).toEqual('External Link');
	  	expect(testObjReturn.length).toEqual(2);

	});
	it('should get items from skipEmpty', () => {
		const testObjReturn = ms.skipEmpty(PAGES_MENU);
	  	expect(testObjReturn.length).toEqual(1);

	});
	it('should get items from convertArrayToItems', () => {
		const testObjReturn = ms.convertArrayToItems(menuItems);
	  	expect(testObjReturn.length).toEqual(2);

	});
	it('should get items from convertObjectToItem', () => {
		const testObjReturn = ms.convertObjectToItem(PAGES_MENU);
	  	expect(testObjReturn.route[0].path).toEqual('pages');

	});
	it('should get items from prepareItem', () => {
		ms.router.createUrlTree = ()=>{return 'tony'};
		ms.router.serializeUrl = ()=>{return 'tony'};
	  	const preparedItemObj = ms.prepareItem(prepare)
	  	expect(preparedItemObj.title).toEqual('Dashboard');

	});
	it('should false from selected', () => {
		ms.router = {
				url:'tones',
				createUrlTree:  ()=>{},
				isActive:  ()=>{ return false },

			};
		const testObjReturn = ms.selectItem(testObj);		
	  	expect(testObjReturn.selected).toEqual(false);

	});


});