// Load the implementations that should be tested
import { ADMIN_NAVBAR } from './user-administration.navbar';

describe('ADMIN_NAVBAR', () => {

	it('should have a ADMIN_NAVBAR object',() => {
		expect(ADMIN_NAVBAR).toBeDefined();
	});
	it('should have a ADMIN_NAVBAR object with a path',() => {
		expect(ADMIN_NAVBAR[0].path).toBeDefined();
	});
	it('should have a ADMIN_NAVBAR object with a page',() => {
		expect(ADMIN_NAVBAR[0].path).toEqual('pages');
	});
	it('should have a ADMIN_NAVBAR object with children',() => {
		expect(ADMIN_NAVBAR[0].children).toBeDefined();
	});
	it('should have a ADMIN_NAVBAR object with 2 children',() => {
	    expect(ADMIN_NAVBAR[0].children.length).toEqual(2);
	});
	it('should have a ADMIN_NAVBAR object with children and a path of dashboard',() => {
	    expect(ADMIN_NAVBAR[0].children[0]).toEqual(jasmine.objectContaining({
	      path: "dashboard"
	    }));
	});

});