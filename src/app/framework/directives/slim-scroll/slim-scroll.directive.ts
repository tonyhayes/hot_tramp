import { Directive, Input, Output, ElementRef, EventEmitter } from '@angular/core';

import 'jquery-slimscroll';
@Directive({
	selector: '[dcSlimScroll]'
})
export class SlimScroll {

	@Input() public slimScrollOptions:Object;

	constructor(private elementRef:ElementRef) {
	}

	ngOnChanges(changes) {
		this.scroll();
	}

	private scroll() {
		this.destroy();
		this.init();
	}

	private init() {
		jQuery(this.elementRef.nativeElement).slimScroll(this.slimScrollOptions);
	}

	private destroy() {
		jQuery(this.elementRef.nativeElement).slimScroll({ destroy: true });
	}
}
