import { Directive, HostBinding } from '@angular/core';

import { ThemeConfigService, isMobile } from '../../../framework';

@Directive({
	selector: '[dcThemeRun]'
})
export class ThemeRun {

	private classes:Array<string> = [];
	@HostBinding('class') classesString:string;

	constructor(private config:ThemeConfigService) {
	}

	public ngOnInit():void {
		this.assignTheme();
		this.assignMobile();
	}

	private assignTheme():void {
		this.addClass(this.config.get().theme.name);
	}

	private assignMobile():void {
		if (isMobile()) {
			this.addClass('mobile');
		}
	}

	private addClass(cls:string) {
		this.classes.push(cls);
		this.classesString = this.classes.join(' ');
	}
}
