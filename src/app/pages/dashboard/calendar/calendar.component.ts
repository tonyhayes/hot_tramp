import { Component, ViewEncapsulation } from '@angular/core';

import { CalendarService } from './calendar.service';

@Component({
  	moduleId: module.id,
  	selector: 'calendar',
  	encapsulation: ViewEncapsulation.None,
  	styleUrls: ['calendar.scss'],
  	templateUrl: 'calendar.html'
})
export class Calendar {

  	public calendarConfiguration:any;
  	private calendar:Object;

  	constructor(private calendarService:CalendarService) {
		this.calendarConfiguration = this.calendarService.getData();
		this.calendarConfiguration.select = (start, end) => this.onSelect(start, end);
  	}

  	public onCalendarReady(calendar):void {
		this.calendar = calendar;
  	}

  	private onSelect(start, end):void {

		if (this.calendar != null) {
	  		let title = prompt('Event Title:');
	  		let eventData;
	  		if (title) {
					eventData = {
		  			title: title,
		  			start: start,
		  			end: end
				};
				jQuery(this.calendar).fullCalendar('renderEvent', eventData, true);
	  		}
	  		jQuery(this.calendar).fullCalendar('unselect');
		}
  	}
}
