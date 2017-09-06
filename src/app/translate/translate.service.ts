import { Injectable, Inject } from '@angular/core';
import { TRANSLATIONS } from './translations'; // import our opaque token

@Injectable()
export class TranslateService {
	private defaultLocale: string = 'en';
	private locale: string;
	private uiLanguage: string;
	
	public get currentLang():string {
	  return this.locale;
	}

  // inject our translations
	constructor(@Inject(TRANSLATIONS) private translations: any) {
		// Get the locale id from the browser language preference
		if(navigator.language){
			this.uiLanguage = navigator.language as string;  		
		}
		if(!this.uiLanguage){
			this.uiLanguage = 'en';
		}
		switch (this.uiLanguage) {
			case 'es':
				this.use('es');
				break;
			case 'fr':
				this.use('fr');
				break;
			default:
				this.use('en');
				break;
		}

	}

	public use(lang: string): void {
		// set current language
		this.locale = lang;
	}

	private translate(key: string): string {
		// private perform translation
		const translation = key;
    	if (this.translations[this.currentLang] && this.translations[this.currentLang][key]) {
			return this.translations[this.currentLang][key];
		}
		//fallback to english when a missing translate key in the preferred language
    	if (this.translations[this.defaultLocale] && this.translations[this.defaultLocale][key]) {
			return this.translations[this.defaultLocale][key];
		}
		// return key if not found
		return translation;
	}

	public instant(key: string):string {
		// public perform translation
		return this.translate(key); 
	}
}