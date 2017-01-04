import {
	inject,
	async,
	TestBed

} from '@angular/core/testing';
import { NameSearchFilterPipe } from './name-search-filter.pipe';
describe('Pipe: NameSearchFilterPipe', () => {
	let pipe = new NameSearchFilterPipe();
	
	//specs

	it('should work with empty array', () => {
		expect(pipe.transform([],null)).toEqual([]);
	});
	it('should work with empty args string', () => {
		expect(pipe.transform([{title:'tony' }],null)).toEqual([{title:'tony' }]);
	});
	it('should work with args string', () => {
		expect(pipe.transform([{title:'tony' }, {title:'cathy' }],'tony')).toEqual([{title:'tony' }]);
	});

}) 