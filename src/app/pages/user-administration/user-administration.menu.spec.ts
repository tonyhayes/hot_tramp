// Load the implementations that should be tested
import { ADMIN_MENU } from './user-administration.menu';

describe('ADMIN_MENU', () => {

	it('should have a menu object',() => {
		expect(ADMIN_MENU).toBeDefined();
	});
	it('should have a ADMIN_menu object with a path',() => {
		expect(ADMIN_MENU[0].path).toBeDefined();
	});
	it('should have a ADMIN_menu object with a page',() => {
		expect(ADMIN_MENU[0].path).toEqual('pages');
	});
	it('should have a ADMIN_menu object with children',() => {
		expect(ADMIN_MENU[0].children).toBeDefined();
	});
	it('should have a ADMIN_menu object with 4 children',() => {
	    expect(ADMIN_MENU[0].children.length).toEqual(4);
	});
	it('should have a ADMIN_menu object with children and a path of dashboard',() => {
	    expect(ADMIN_MENU[0].children[0]).toEqual(jasmine.objectContaining({
	      	path: "dashboard"
	    }));
	});

});