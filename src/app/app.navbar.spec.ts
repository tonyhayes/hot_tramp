// Load the implementations that should be tested
import { NAVBAR } from './app.navbar';

describe('NAVBAR', () => {

	it('should have a NAVBAR object',() => {
		console.log(NAVBAR);
		expect(NAVBAR).toBeDefined();
	}));
	it('should have a NAVBAR object with a path',() => {
		expect(NAVBAR[0].path).toBeDefined();
	}));
	it('should have a NAVBAR object with a page',() => {
		expect(NAVBAR[0].path).toEqual('pages');
	}));
	it('should have a NAVBAR object with children',() => {
		expect(NAVBAR[0].children).toBeDefined();
	}));
	it('should have a NAVBAR object with 2 children',() => {
	    expect(NAVBAR[0].children.length).toEqual(2);
	}));
	it('should have a NAVBAR object with children and a path of dashboard',() => {
	    expect(NAVBAR[0].children[0]).toEqual(jasmine.objectContaining({
	      path: "dashboard"
	    }));
	}));

});