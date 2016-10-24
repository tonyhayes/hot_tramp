import { Directive, Input, Output, ElementRef, EventEmitter } from '@angular/core';

import './slim-scroll.loader.ts';

@Directive({
	selector: '[baSlimScroll]'
})
export class SlimScroll {

	@Input() public slimScrollOptions:Object;

	constructor(private _elementRef:ElementRef) {
	}

	ngOnChanges(changes) {
		this._scroll();
	}

	private _scroll() {
		this._destroy();
		this._init();
	}

	private _init() {
		jQuery(this._elementRef.nativeElement).slimScroll(this.slimScrollOptions);
	}

	private _destroy() {
		jQuery(this._elementRef.nativeElement).slimScroll({ destroy: true });
	}
}
