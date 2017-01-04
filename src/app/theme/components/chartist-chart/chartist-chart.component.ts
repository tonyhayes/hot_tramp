import {
		Component,
		ViewChild,
		ViewEncapsulation,
		Input,
		Output,
		ElementRef,
		EventEmitter,
		OnInit,
		OnChanges,
		OnDestroy,
} from '@angular/core';

import { Chartist } from './chartist-chart.component.loader.ts';

@Component({
	selector: 'dc-chartist-chart',
	encapsulation: ViewEncapsulation.None,
	styles: [ require('chartist/dist/chartist.css'), require('./chartist-chart.component.scss') ],
	templateUrl: './chartist-chart.component.html',
})
export class ChartistChart {

	@Input() chartistChartType:string;
	@Input() chartistChartData:Object;
	@Input() chartistChartOptions:Object;
	@Input() chartistChartResponsive:Object;
	@Input() chartistChartClass:string;
	@Output() onChartReady = new EventEmitter<any>();

	@ViewChild('chartistChart') private selector:ElementRef;

	private chart;

	ngAfterViewInit() {
		this.chart = new Chartist[this.chartistChartType](this.selector.nativeElement, this.chartistChartData, this.chartistChartOptions, this.chartistChartResponsive);
		this.onChartReady.emit(this.chart);
	}

	ngOnChanges() {
		if (this.chart) {
			(<any>this.chart).update(this.chartistChartData, this.chartistChartOptions);
		}
	}

	ngOnDestroy():void {
		if (this.chart) {
			this.chart.detach();
		}
	}
}
