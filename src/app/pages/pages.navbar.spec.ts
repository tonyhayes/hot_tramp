// Load the implementations that should be tested
import { PAGES_NAVBAR } from './pages.navbar';
import {} from 'jasmine'

describe('PAGES_NAVBAR', () => {

	it('should have a PAGES_NAVBAR object',() => {
		expect(PAGES_NAVBAR).toBeDefined();
	});
	it('should have a PAGES_NAVBAR object with a path',() => {
		expect(PAGES_NAVBAR[0].path).toBeDefined();
	});
	it('should have a PAGES_NAVBAR object with a page',() => {
		expect(PAGES_NAVBAR[0].path).toEqual('pages');
	});
	it('should have a PAGES_NAVBAR object with children',() => {
		expect(PAGES_NAVBAR[0].children).toBeDefined();
	});
	it('should have a PAGES_NAVBAR object with 0 children',() => {
	    expect(PAGES_NAVBAR[0].children.length).toEqual(0);
	});

});