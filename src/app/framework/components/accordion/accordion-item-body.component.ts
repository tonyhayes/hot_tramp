import { Component, ElementRef, Renderer, ViewChild } from '@angular/core';

@Component({
	selector: 'dc-accordion-item-body',
	template: `
		<div #body class="dc-accordion-item-body hideScrollBar" [style.height]="height">
			<div class="inner"><ng-content></ng-content></div>
		</div>
	`
})
export class AccordionItemBody {

	private height: String = '0';

	@ViewChild('body') bodyEl: ElementRef;

	constructor(private renderer: Renderer) {}
	
	toggle(collapsed: boolean) {
		var height: String = '0';
		if (!collapsed) {
			this.renderer.setElementStyle(this.bodyEl.nativeElement, 'height', 'auto');
			height = this.bodyEl.nativeElement.offsetHeight +25 + 'px';
			this.renderer.setElementStyle(this.bodyEl.nativeElement, 'height', '0');
		}
		setTimeout(() => this.height = height, 50);
	}
}