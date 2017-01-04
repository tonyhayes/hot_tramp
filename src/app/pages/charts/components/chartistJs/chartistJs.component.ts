import { Component, ViewEncapsulation } from '@angular/core';

import { ChartistJsService } from './chartistJs.service';

@Component({
	selector: 'chartist-js',
	encapsulation: ViewEncapsulation.None,
	styles: [require('chartist/dist/chartist.css'), require('./chartistJs.scss')],
	templateUrl: './chartistJs.html',
})

export class ChartistJs {

	data:any;

	constructor(private chartistJsService:ChartistJsService) {}

	ngOnInit() {
		this.data = this.chartistJsService.getAll();
	}

	getResponsive(padding, offset) {
		return this.chartistJsService.getResponsive(padding, offset);
	}
}
