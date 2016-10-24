import { Component, ViewEncapsulation } from '@angular/core';
import { NAVBAR } from '../../../../app/app.navbar';


@Component({
  	moduleId: module.id,
  	selector: 'dc-navbar-top',
  	styleUrls: ['navbar-top.component.scss'],
  	templateUrl: 'navbar-top.component.html',
  	encapsulation: ViewEncapsulation.None
})
export class NavbarTop {

  	// here we declare which routes we want to use as a menu in our sidebar
  	public routes = _.cloneDeep(NAVBAR); // we're creating a deep copy since we are going to change that object

  	constructor() {}


}
