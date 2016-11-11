import { 
	Component, ViewChild, ViewEncapsulation, Input, Output, ElementRef, EventEmitter 
} from '@angular/core';

import { ThemePreloader } from '../../../theme/services';

import './am-chart.component.loader';
import { AmChartThemeService } from './am-chart-theme.service';

@Component({
  	moduleId: module.id,
	selector: 'dc-am-chart',
	templateUrl: 'am-chart.component.html',
	encapsulation: ViewEncapsulation.None,
	providers: [ AmChartThemeService ],
})
export class AmChart {

	@Input() amChartConfiguration:Object;
	@Input() amChartClass:string;
	@Output() onChartReady = new EventEmitter<any>();

	@ViewChild('amChart') private selector:ElementRef;

	constructor (private amChartThemeService:AmChartThemeService) {
		this.loadChartsLib();
	}

	ngOnInit() {
		AmCharts.themes.blur = this.amChartThemeService.getTheme();
	}

	ngAfterViewInit() {
		let chart = AmCharts.makeChart(this.selector.nativeElement, this.amChartConfiguration);
		this.onChartReady.emit(chart);
	}

	private loadChartsLib():void {
		ThemePreloader.registerLoader(new Promise((resolve, reject) => {
			let amChartsReadyMsg = 'AmCharts ready';

			if (AmCharts.isReady) {
				resolve(amChartsReadyMsg);
			} else {
				AmCharts.ready(function () {
					resolve(amChartsReadyMsg);
				});
			}
		}));
	}
}
