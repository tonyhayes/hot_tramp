import {
	inject,
	async,
	TestBed

} from '@angular/core/testing';
import { TranslateService } from '../../../translate/translate.service';
import { TRANSLATIONS } from '../../../translate/translations'; // import our opaque token
import { TranslatePipe } from './translate.pipe';
describe('Pipe: TranslatePipe', () => {
	 const translateService = new TranslateService(TRANSLATIONS);
	 let pipe = new TranslatePipe(translateService);
	
	//specs
	it('should throw if not used with a string', () => {
		//must use arrow function for expect to capture exception
		expect(()=>pipe.transform(null)).toThrow();
		expect(()=>pipe.transform(undefined)).toThrow();
		expect(()=>pipe.transform()).toThrow();
		expect(()=>pipe.transform()).toThrowError('Requires a String as input');
		expect(()=>pipe.transform()).toThrowError(Error);
		expect(()=>pipe.transform()).toThrowError(Error, 'Requires a String as input');
	});

	it('should work with empty string', () => {
		expect(pipe.transform('')).toEqual(undefined);
	});

	it('should return value', () => {
		expect(pipe.transform('pic')).toEqual('pic');
	});

}) 