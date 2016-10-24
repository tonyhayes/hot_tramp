// Load the implementations that should be tested
import { MENU } from './app.menu';

describe('MENU', () => {

	it('should have a menu object',() => {
		console.log(MENU);
		expect(MENU).toBeDefined();
	}));
	it('should have a menu object with a path',() => {
		expect(MENU[0].path).toBeDefined();
	}));
	it('should have a menu object with a page',() => {
		expect(MENU[0].path).toEqual('pages');
	}));
	it('should have a menu object with children',() => {
		expect(MENU[0].children).toBeDefined();
	}));
	it('should have a menu object with 10 children',() => {
	    expect(MENU[0].children.length).toEqual(10);
	}));
	it('should have a menu object with children and a path of dashboard',() => {
	    expect(MENU[0].children[0]).toEqual(jasmine.objectContaining({
	      	path: "dashboard"
	    }));
	}));
	it('should have a menu object with children and a path of tables',() => {
	    expect(MENU[0].children[5]).toEqual(jasmine.objectContaining({
	      	path: "tables"
	    }));
	}));

});