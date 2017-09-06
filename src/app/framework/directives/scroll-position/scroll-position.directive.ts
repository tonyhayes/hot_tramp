import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
	selector: '[dcScrollPosition]'
})
export class ScrollPosition {

	@Input() public maxHeight:number;
	@Output() public scrollChange:EventEmitter<boolean> = new EventEmitter<boolean>();

	private isScrolled:boolean;

	public ngOnInit():void {
		this.onWindowScroll();
	}

	@HostListener('window:scroll')
	onWindowScroll():void {
		let isScrolled = window.scrollY > this.maxHeight;
		if (isScrolled !== this.isScrolled) {
			this.isScrolled = isScrolled;
			this.scrollChange.emit(isScrolled);
		}
	}
}
