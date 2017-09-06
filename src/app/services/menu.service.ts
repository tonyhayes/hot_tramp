import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import * as _ from 'lodash';
import { TranslateService } from '../translate';

@Injectable()
export class MenuService {

//	currentMenuItem = {};

	constructor( public router:Router, private translate: TranslateService ) {}

	convertRoutesToMenus(routes:Routes):any[] {
		let items = this.convertArrayToItems(_.cloneDeep(routes));
		return this.skipEmpty(items);
	}

	// getCurrentItem():any {
	// 	return this.currentMenuItem;
	// }

// 	selectMenuItem(menuItems:any[]):any[] {
// 		let items = [];
// 		menuItems.forEach((item) => {
// //			this.selectItem(item);

// 			if (item.selected) {
// 				this.currentMenuItem = item;
// 			}

// 			if (item.children && item.children.length > 0) {
// 				item.children = this.selectMenuItem(item.children);
// 			}
// 			items.push(item);
// 		});
// 		return items;
// 	}

	skipEmpty(items:any[]):any[] {
		let menu = [];
		items.forEach((item) => {
			let menuItem;
			if (item.skip) {
				if (item.children && item.children.length > 0) {
					menuItem = item.children;
				}
			} else {
				menuItem = item;
			}

			if (menuItem) {
				menu.push(menuItem);
			}
		});

		return [].concat.apply([], menu);
	}

	convertArrayToItems(routes:any[], parent?:any):any[] {
		let items = [];
		routes.forEach((route) => {
			items.push(this.convertObjectToItem(route, parent));
		});
		return items;
	}

	convertObjectToItem(object, parent?:any):any {
		let item:any = {};
		if (object.data && object.data.menu) {
			// this is a menu object
			item = object.data.menu;
			item.route = object;
			delete item.route.data.menu;
		} else {
			item.route = object;
			item.skip = true;
		}

		// we have to collect all paths to correctly build the url then
	    if (Array.isArray(item.route.path)) {
	      	item.route.paths = item.route.path;
	    } else {
	      	item.route.paths = parent && parent.route && parent.route.paths ? parent.route.paths.slice(0) : ['/'];
	      	if (!!item.route.path){
	      		item.route.paths.push(item.route.path);
	      	}
	    }


		if (object.children && object.children.length > 0) {
			item.children = this.convertArrayToItems(object.children, item);
		}

//		let prepared = this.prepareItem(item);

		// if current item is selected or expanded - then parent is expanded too
		if ((item.selected || item.expanded) && parent) {
			parent.expanded = true;
		}

		return item;
	}

	// prepareItem(object:any):any {
	// 	if (!object.skip) {


	// 		object.target = object.target || '';
 //      		object.pathMatch = object.pathMatch  || 'full';
	// 		return this.selectItem(object);
	// 	}

	// 	return object;
	// }

	// selectItem(object:any):any {
 //  		object.selected = this.router.isActive(this.router.createUrlTree(object.route.paths), object.pathMatch === 'full');
 //      	return object;				
	// }

	addChildItem(menuFile, menuItemPath, title, sortField, categoryId, attributeCount?, expanded?):any {
		menuFile[0].children.forEach( menuHeader  => {
			if(!menuItemPath.includes(menuHeader.path)) {
				return;
			}
			if(categoryId != menuHeader.data.menu.id) {
				return;
			}
			if(!menuHeader.children){
				menuHeader.children = []
			}
			let menuObj = {};
			menuObj['path'] = [ menuItemPath ];
			menuObj['data'] = { 
				menu:{
					title: title,
					sortField: sortField,
					iconTitle: this.translate.instant('TOOLTIP_DELETE'),
					icon: 'ion-ios-trash',
					attributeCount: attributeCount || 0,
					expanded: expanded || false,
				}
			}
			//do not add if child exists
			const found = menuHeader.children.some(child => child.path.toString() == menuObj['path'].toString())
			if(found){
				return
			} 
			menuHeader.children.push(menuObj);
			//sort menuHeader.children by data.title
						
			menuHeader = menuHeader.children.sort((a, b)=> {
  				if (b.data.menu.sortField < a.data.menu.sortField){
     				return -1;
  				}
   				if (b.data.menu.sortField > a.data.menu.sortField){
    				return 1;
   				}
   				return 0;
			});			

		});
      	return menuFile;				
	}
	resetChildExpandedFlag(menuFile):any {
		menuFile[0].children.forEach( menuHeader  => {
			if(!menuHeader.children){
				return;
			}
			menuHeader.children.forEach(child => {
				child.data.menu.expanded = false;				
			})

		});
      	return menuFile;				
	}
	removeChildItem(menuFile, menuItemPath):any {
		menuFile[0].children.forEach( menuHeader  => {
			if(!menuItemPath.includes(menuHeader.path)) {
				return;
			}
			if(!menuHeader.children){
				return;
			}
			menuHeader.children.forEach((child, idx) => {
				if(child.path.toString() == menuItemPath){
					menuHeader.children.splice(idx, 1);
				}
			})

		});
      	return menuFile;				
	}
	renameChildItem(menuFile, menuItemPath, menuItemChildPath, title):any {
		menuFile[0].children.forEach( menuHeader  => {
			if(!menuItemPath.includes(menuHeader.path)) {
				return;
			}
			if(!menuHeader.children){
				return;
			}
			menuHeader.children.forEach(child => {
				if(child.path.toString() == menuItemChildPath){
					child.data.menu.title = title
				}
			})
		});
      	return menuFile;				
	}
}
