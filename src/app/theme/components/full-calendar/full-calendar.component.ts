import { 
	Component, ViewChild, ViewEncapsulation, Input, Output, ElementRef, EventEmitter 
} from '@angular/core';

import './full-calendar.component.loader.ts';

@Component({
	selector: 'dc-full-calendar',
	templateUrl: './full-calendar.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class FullCalendar {

	@Input() fullCalendarConfiguration:Object;
	@Input() fullCalendarClass:string;
	@Output() onCalendarReady = new EventEmitter<any>();

	@ViewChild('fullCalendar') private selector:ElementRef;

	ngAfterViewInit() {
		let calendar = jQuery(this.selector.nativeElement).fullCalendar(this.fullCalendarConfiguration);
		this.onCalendarReady.emit(calendar);
	}
}
