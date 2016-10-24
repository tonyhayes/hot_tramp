// Load the implementations that should be tested
import { NavbarItem } from './navbar-item.component';

describe('NavbarItem', () => {
	// provide our implementations or mocks to the dependency injector


	it('should define NavbarItem', () => {
	  	expect(NavbarItem).toBeDefined();
	});

	it('should construct a NavbarItem', () => {
		const navbarItem = new NavbarItem();
	  	expect(navbarItem).toBeDefined();
	});

});