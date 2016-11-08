// Load the implementations that should be tested
import { NavbarTop } from './navbar-top.component';

describe('NavbarTop', () => {
	// provide our implementations or mocks to the dependency injector


	it('should define NavbarTop', () => {
	  	expect(NavbarTop).toBeDefined();
	});

	it('should construct a NavbarTop', () => {
		const navbarTop = new NavbarTop();
	  	expect(navbarTop.routes).toBeDefined();
	});

	it('should have a routes object with a path',() => {
		const navbarTop = new NavbarTop();
		expect(navbarTop.routes[0].path).toBeDefined();
	});
	it('should have a routes object with a page',() => {
		const navbarTop = new NavbarTop();
		expect(navbarTop.routes[0].path).toEqual('pages');
	});
	it('should have a routes object with children',() => {
		const navbarTop = new NavbarTop();
		expect(navbarTop.routes[0].children).toBeDefined();
	});
	it('should have a routes object with 10 children',() => {
		const navbarTop = new NavbarTop();
	    expect(navbarTop.routes[0].children.length).toEqual(3);
	});
	it('should have a routes object with children and a path of dashboard',() => {
		const navbarTop = new NavbarTop();
	    expect(navbarTop.routes[0].children[0]).toEqual(jasmine.objectContaining({
	      	path: "dashboard"
	    }));
	});

});