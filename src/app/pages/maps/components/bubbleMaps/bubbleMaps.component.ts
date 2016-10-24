import { Component, ViewEncapsulation } from '@angular/core';

import { BubbleMapsService } from './bubbleMaps.service';

@Component({
	moduleId: module.id,
	selector: 'bubble-maps',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['bubbleMaps.scss'],
	templateUrl: 'bubbleMaps.html',
})
export class BubbleMaps {

  	chartData:Object;

  	constructor(private bubbleMapsService:BubbleMapsService) {}

  	ngOnInit() {
		this.chartData = this.bubbleMapsService.getData();
  	}
}
