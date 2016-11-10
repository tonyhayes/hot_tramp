import { Component, ViewEncapsulation } from '@angular/core';
import { Auth }              from '../../auth.service';

@Component({
  	moduleId: module.id,
  	selector: 'dashboard',
  	encapsulation: ViewEncapsulation.None,
  	styleUrls: ['dashboard.scss'],
  	templateUrl: 'dashboard.html'
})
export class Dashboard {

  	constructor(private auth: Auth) {}

}
