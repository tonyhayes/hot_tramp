import { Component, ViewEncapsulation } from '@angular/core';

import { UsersMapService } from './usersMap.service';

@Component({
  	moduleId: module.id,
  	selector: 'users-map',
  	encapsulation: ViewEncapsulation.None,
  	styleUrls: ['usersMap.scss'],
  	templateUrl: 'usersMap.html'
})
export class UsersMap {

  	mapData:Object;

  	constructor(private usersMapService:UsersMapService) {
    	this.mapData = this.usersMapService.getData();
  	}
}
