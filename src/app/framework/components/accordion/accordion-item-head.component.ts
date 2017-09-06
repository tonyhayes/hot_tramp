import { Component, Input } from '@angular/core';
import { AccordionItem } from './accordion-item.component';

@Component({
	selector: 'dc-accordion-item-head',
	template: `
		<div class="dc-accordion-item-head">
			<a role="button" (click)="toggleClick($event)"><ng-content></ng-content><span class="ion-chevron-right"></span></a>
		</div>
	`
})
export class AccordionItemHead {


	constructor(private accordionItem: AccordionItem) {}
	toggleClick(event?) {
		if(event){
			event.preventDefault();
		}
		this.accordionItem.collapsed = !this.accordionItem.collapsed;
		this.accordionItem.toggle(this.accordionItem.collapsed);
	}
}