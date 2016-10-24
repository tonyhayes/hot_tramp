import {
	inject,
	async,
	TestBed

} from '@angular/core/testing';
import { ProfilePicturePipe } from './profile-picture.pipe';
describe('Pipe: ProfilePicturePipe', () => {
	 let pipe = new ProfilePicturePipe();
	
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
				expect(pipe.transform('')).toEqual('assets/img/app/profile/.png');
		});
	
		it('should find image', () => {
				expect(pipe.transform('pic')).toEqual('assets/img/app/profile/pic.png');
		});
}) 