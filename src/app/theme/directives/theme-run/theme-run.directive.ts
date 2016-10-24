import { Directive, HostBinding } from '@angular/core';

import { ThemeConfigService, isMobile } from '../../../theme';

@Directive({
	selector: '[baThemeRun]'
})
export class ThemeRun {

	private _classes:Array<string> = [];
	@HostBinding('class') classesString:string;

	constructor(private _config:ThemeConfigService) {
	}

	public ngOnInit():void {
		this._assignTheme();
		this._assignMobile();
	}

	private _assignTheme():void {
		this._addClass(this._config.get().theme.name);
	}

	private _assignMobile():void {
		if (isMobile()) {
			this._addClass('mobile');
		}
	}

	private _addClass(cls:string) {
		this._classes.push(cls);
		this.classesString = this._classes.join(' ');
	}
}
