import { Component, ViewEncapsulation } from '@angular/core';

import { LineMapsService } from './lineMaps.service';

@Component({
  	moduleId: module.id,
  	selector: 'line-maps',
  	encapsulation: ViewEncapsulation.None,
  	styleUrls: ['lineMaps.scss'],
  	templateUrl: 'lineMaps.html'
})
export class LineMaps {

  	chartData:Object;

  	constructor(private lineMapsService:LineMapsService) {
    	this.chartData = this.lineMapsService.getData();
  	}
}
