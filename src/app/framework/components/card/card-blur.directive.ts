import {
	Directive, ElementRef, HostListener, HostBinding 
} from '@angular/core';
import { ThemeConfigService } from '../../../framework';

import { CardBlurHelper } from './card-blur-helper.service';
import { BgMetrics } from './bg-metrics';

@Directive({
	selector: '[cardBlur]',
	providers: [CardBlurHelper]
})
export class CardBlur {

	@HostBinding('class.card-blur') isEnabled:boolean = false;

	private bodyBgSize:BgMetrics;

	constructor(private config:ThemeConfigService, private cardBlurHelper:CardBlurHelper, private el:ElementRef) {
		if (this._isEnabled()) {
			this.cardBlurHelper.init();
			this.getBodyImageSizesOnBgLoad();
			this.recalculateCardStylesOnBgLoad();

			this.isEnabled = true;
		}
	}

	@HostListener('window:resize')
	_onWindowResize():void {
		if (this._isEnabled()) {
			this.bodyBgSize = this.cardBlurHelper.getBodyBgImageSizes();
			this.recalculateCardStyle();
		}
	}

	private getBodyImageSizesOnBgLoad():void {
		this.cardBlurHelper.bodyBgLoad().subscribe(() => {
			this.bodyBgSize = this.cardBlurHelper.getBodyBgImageSizes();
		});
	}

	private recalculateCardStylesOnBgLoad():void {
		this.cardBlurHelper.bodyBgLoad().subscribe((event) => {
			setTimeout(this.recalculateCardStyle.bind(this));
		})
	}

	private recalculateCardStyle():void {
		if (!this.bodyBgSize) {
			return;
		}
		this.el.nativeElement.style.backgroundSize = Math.round(this.bodyBgSize.width) + 'px ' + Math.round(this.bodyBgSize.height) + 'px';
		this.el.nativeElement.style.backgroundPosition = Math.floor(this.bodyBgSize.positionX) + 'px ' + Math.floor(this.bodyBgSize.positionY) + 'px';
	}

	private _isEnabled() {
		return this.config.get().theme.name == 'blur';
	}
}
