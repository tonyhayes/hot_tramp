import { Component, ViewEncapsulation, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
	selector: 'dc-navbar-top',
	styleUrls: ['./navbar-top.component.scss'],
	templateUrl: './navbar-top.component.html',
//	encapsulation: ViewEncapsulation.None
})
export class NavbarTop {

	@Input() navbar: Array<any> = [];
	// here we declare which routes we want to use as a menu in our sidebar
	public routes: Array<any> = []; // we're creating a deep copy since we are going to change that object

	constructor() {}

	public ngOnInit():void {
		this.routes = _.cloneDeep(this.navbar)
	}


}
