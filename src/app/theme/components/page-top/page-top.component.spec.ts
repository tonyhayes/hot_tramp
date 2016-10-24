// Load the implementations that should be tested
import { PageTop } from './page-top.component';
import { GlobalState } from '../../../global.state';

describe('PageTop', () => {
	// provide our implementations or mocks to the dependency injector

	const gs = new GlobalState();

	it('should define PageTop', () => {
	  	expect(PageTop).toBeDefined();
	});
	it('should construct a PageTop', () => {
		const pageTop = new PageTop(gs);
	  	expect(pageTop.isMenuCollapsed).toEqual(false);
	  	expect(pageTop.isScrolled).toEqual(false);
	});
	it('should toggle scrolledChanged -true', () => {
		const pageTop = new PageTop(gs);
		pageTop.scrolledChanged(true);
	  	expect(pageTop.isScrolled).toEqual(true);
	});
	it('should toggleMenu', () => {
		const pageTop = new PageTop(gs);
		pageTop.isMenuCollapsed = true;
		pageTop.toggleMenu();
	  	expect(pageTop.isMenuCollapsed).toEqual(false);
		pageTop.toggleMenu();
	  	expect(pageTop.isMenuCollapsed).toEqual(true);
	});


});