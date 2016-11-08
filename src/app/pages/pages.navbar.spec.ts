// Load the implementations that should be tested
import { PAGES_NAVBAR } from './pages.navbar';

describe('PAGES_NAVBAR', () => {

	it('should have a PAGES_NAVBAR object',() => {
		console.log(PAGES_NAVBAR);
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
	it('should have a PAGES_NAVBAR object with 2 children',() => {
	    expect(PAGES_NAVBAR[0].children.length).toEqual(3);
	});
	it('should have a PAGES_NAVBAR object with children and a path of dashboard',() => {
	    expect(PAGES_NAVBAR[0].children[0]).toEqual(jasmine.objectContaining({
	      path: "dashboard"
	    }));
	});

});