// Load the implementations that should be tested
import { PAGES_MENU } from './pages.menu';

describe('PAGES_MENU', () => {

	it('should have a menu object',() => {
		console.log(PAGES_MENU);
		expect(PAGES_MENU).toBeDefined();
	});
	it('should have a PAGES_menu object with a path',() => {
		expect(PAGES_MENU[0].path).toBeDefined();
	});
	it('should have a PAGES_menu object with a page',() => {
		expect(PAGES_MENU[0].path).toEqual('pages');
	});
	it('should have a PAGES_menu object with children',() => {
		expect(PAGES_MENU[0].children).toBeDefined();
	});
	it('should have a PAGES_menu object with 10 children',() => {
	    expect(PAGES_MENU[0].children.length).toEqual(10);
	});
	it('should have a PAGES_menu object with children and a path of dashboard',() => {
	    expect(PAGES_MENU[0].children[0]).toEqual(jasmine.objectContaining({
	      	path: "dashboard"
	    }));
	});
	it('should have a PAGES_menu object with children and a path of tables',() => {
	    expect(PAGES_MENU[0].children[5]).toEqual(jasmine.objectContaining({
	      	path: "tables"
	    }));
	});

});