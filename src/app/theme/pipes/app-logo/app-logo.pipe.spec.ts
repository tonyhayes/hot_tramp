import {
	inject,
	async,
	TestBed
} from '@angular/core/testing';
import { AppLogoPipe } from './app-logo.pipe';
describe('Pipe: AppLogoPipe', () => {
	let pipe = new AppLogoPipe();
	
		//setup
 
	 
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
				expect(pipe.transform('')).toEqual('assets/img/app/logo/.png');
		});
	
		it('should find image', () => {
				expect(pipe.transform('logo')).toEqual('assets/img/app/logo/logo.png');
		});
}) 