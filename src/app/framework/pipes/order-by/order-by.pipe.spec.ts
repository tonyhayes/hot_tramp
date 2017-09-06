import {
	inject,
	async,
	TestBed

} from '@angular/core/testing';
import { OrderByPipe } from './order-by.pipe';
describe('Pipe: OrderByPipe', () => {
	let pipe = new OrderByPipe();
	
	//specs

	it('should sort with desc string', () => {
		expect(pipe.transform([{title:'tony' }, {title:'cathy' }],{property: 'title', direction:'desc'})).toEqual([{title:'tony' }, {title:'cathy' }]);
	});
	it('should sort with asc string', () => {
		expect(pipe.transform([{title:'tony' }, {title:'cathy' }],{property: 'title', direction:'asc'})).toEqual([{title:'cathy' }, {title:'tony' }]);
	});

}) 