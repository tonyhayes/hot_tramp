import { TranslateService } from './translate.service';
import { TRANSLATIONS } from './translations'; // import our opaque token

describe('TranslateService', () => {

	const translateService = new TranslateService(TRANSLATIONS);
	//specs
	it('should create TranslateService', () => {
		expect(translateService).toBeDefined();
	});
	it('should create defaultLocale', () => {
		expect(translateService.defaultLocale).toEqual('en');
	});
	it('should create locale', () => {
		expect(translateService.locale).toEqual('en');
	});
	it('should change locale', () => {
		translateService.use('es')
		expect(translateService.locale).toEqual('es');
	});
	it('should maintain currentLang', () => {
		expect(translateService.currentLang).toEqual('es');
	});
	it('should return locale specific string', () => {
		translateService.use('en')
		expect(translateService.translate('HOME')).toEqual('HOME');
	});
	it('should instant return locale specific string', () => {
		translateService.use('es')
		expect(translateService.instant('hello world')).toEqual('hello world');
	});

}) 

