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



});