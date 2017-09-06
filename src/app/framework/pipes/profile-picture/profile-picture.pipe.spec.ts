import {
	inject,
	async,
	TestBed

} from '@angular/core/testing';
import { ProfilePicturePipe } from './profile-picture.pipe';
import { GlobalState } from '../../../global.state';
describe('Pipe: ProfilePicturePipe', () => {
	const gs = new GlobalState();
	let pipe = new ProfilePicturePipe(gs);
	
	//specs
	it('should throw if not used with a string', () => {
		//must use arrow function for expect to capture exception
		expect(()=>pipe.transform(null)).toThrow();
		expect(()=>pipe.transform(undefined)).toThrow();
		expect(()=>pipe.transform(null)).toThrow();
		expect(()=>pipe.transform(null)).toThrowError('Requires a String as input');
		expect(()=>pipe.transform(null)).toThrowError(Error);
		expect(()=>pipe.transform(null)).toThrowError(Error, 'Requires a String as input');
	});

	it('should work with empty string', () => {
		expect(pipe.transform('')).toEqual('');
	});

	it('should find image', () => {
		expect(pipe.transform('pic')).toEqual('pic');
	});
	it('should work with localstorge string', () => {
		expect(pipe.transform('auth0Avatar')).toEqual('assets/img/app/profile/arrow_drop_down_circle_24px.svg');
	});

}) 