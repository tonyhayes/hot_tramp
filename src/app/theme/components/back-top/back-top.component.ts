import { 
	Component, ViewChild, HostListener, Input, ElementRef
} from '@angular/core';

@Component({
	selector: 'dc-back-top',
	styleUrls: [ './back-top.component.scss' ],
	template: `
		<i #backTop class="fa fa-angle-up back-top dc-back-top" title="Back to Top"></i>
	`
})
export class BackTop {

	@Input() position:number = 400;
	@Input() showSpeed:number = 500;
	@Input() moveSpeed:number = 1000;

	@ViewChild('backTop') private selector:ElementRef;

	ngAfterViewInit () {
		this._onWindowScroll();
	}

	@HostListener('click')
	_onClick():boolean {
		jQuery('html, body').animate({scrollTop:0}, {duration:this.moveSpeed});
		return false;
	}

	@HostListener('window:scroll')
	_onWindowScroll():void {
		let el = this.selector.nativeElement;
		window.scrollY > this.position ? jQuery(el).fadeIn(this.showSpeed) : jQuery(el).fadeOut(this.showSpeed);
	}
}
