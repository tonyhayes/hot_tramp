import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Injectable()
export class NavbarService {

	protected currentNavbarItem = {};

	constructor(private router:Router) {
	}

	public convertRoutesToNavbarItems(routes:Routes):any[] {
		let items = this.convertArrayToItems(routes);
		return this.skipEmpty(items);
	}

	public getCurrentItem():any {
		return this.currentNavbarItem;
	}

	public selectNavbarItem(navbarItems:any[]):any[] {
		let items = [];
		navbarItems.forEach((item) => {
			this.selectItem(item);

			if (item.selected) {
				this.currentNavbarItem = item;
			}

			if (item.children && item.children.length > 0) {
				item.children = this.selectNavbarItem(item.children);
			}
			items.push(item);
		});
		return items;
	}

	protected skipEmpty(items:any[]):any[] {
		let navbar = [];
		items.forEach((item) => {
			let navbarItem;
			if (item.skip) {
				if (item.children && item.children.length > 0) {
					navbarItem = item.children;
				}
			} else {
				navbarItem = item;
			}

			if (navbarItem) {
				navbar.push(navbarItem);
			}
		});

		return [].concat.apply([], navbar);
	}

	protected convertArrayToItems(routes:any[], parent?:any):any[] {
		let items = [];
		routes.forEach((route) => {
			items.push(this.convertObjectToItem(route, parent));
		});
		return items;
	}

	protected convertObjectToItem(object, parent?:any):any {
		let item:any = {};
		if (object.data && object.data.navbar) {
			// this is a navbar object
			item = object.data.navbar;
			item.route = object;
			delete item.route.data.navbar;
		} else {
			item.route = object;
			item.skip = true;
		}

		// we have to collect all paths to correctly build the url then
	    if (Array.isArray(item.route.path)) {
	      	item.route.paths = item.route.path;
	    } else {
	      	item.route.paths = parent && parent.route && parent.route.paths ? parent.route.paths.slice(0) : ['/'];
	      	item.route.paths.push(item.route.path);
	    }

		if (object.children && object.children.length > 0) {
			item.children = this.convertArrayToItems(object.children, item);
		}

		let prepared = this.prepareItem(item);

		// if current item is selected or expanded - then parent is expanded too
		if ((prepared.selected || prepared.expanded) && parent) {
			parent.expanded = true;
		}

		return prepared;
	}

	protected prepareItem(object:any):any {

		if (!object.skip) {

			object.target = object.target || '';
			return this.selectItem(object);
		}

		return object;
	}

	protected selectItem(object:any):any {
  		object.selected = this.router.isActive(this.router.createUrlTree(object.route.paths), object.pathMatch !== 'full');
		return object;
	}
}
