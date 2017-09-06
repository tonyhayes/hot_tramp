import { 
	Component, ViewChild, HostListener, Input, ElementRef
} from '@angular/core';
import { Util } from '../../helpers/util';

@Component({
	selector: 'dc-back-top',
	styleUrls: [ './back-top.component.scss' ],
	template: `
		<i #backTop class="ion-chevron-up back-top dc-back-top" title="{{ 'TITLE_BACK_TO_TOP' | dcTranslate }}"></i>
	`
})
export class BackTop {

	@Input() position:number = 400;
	@Input() showSpeed:number = 500;
	@Input() moveSpeed:number = 1000;
	// Reference: http://www.html5rocks.com/en/tutorials/speed/animations/
 	ticking = false;
 	tickTime = 250;

	@ViewChild('backTop') private selector:ElementRef;

	ngAfterViewInit () {
		if(Util.isIOS){
			this.tickTime = 5000;
		}
		this.onWindowScroll();
	}

	@HostListener('click')
	onClick():boolean {
		jQuery('html, body').animate({scrollTop:0}, {duration:this.moveSpeed});
		return false;
	}

	@HostListener('window:scroll')
	onWindowScroll():void {
		if (!this.ticking) {
			this.ticking = true;
			let el = this.selector.nativeElement;
			window.scrollY > this.position ? jQuery(el).fadeIn(this.showSpeed) : jQuery(el).fadeOut(this.showSpeed);
		}

		setTimeout(() => {
			this.ticking = false;
	 	},this.tickTime);
	}
}
