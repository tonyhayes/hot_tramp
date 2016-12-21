// Load the implementations that should be tested
import { Sidebar } from './sidebar.component';
import { GlobalState } from '../../../global.state';

describe('Sidebar', () => {
	// provide our implementations or mocks to the dependency injector

	const gs = new GlobalState();
	const el = {
		nativeElement: {
			childNodes:[
			{
				clientHeight: 85
			}
			]
		}
	};

	it('should define Sidebar', () => {
	  	expect(Sidebar).toBeDefined();
	});

	it('should construct a Sidebar', () => {
		const sidebar = new Sidebar(el, gs);
	  	expect(sidebar.isMenuCollapsed).toEqual(false);
	});
	it('should return true for shouldMenuCollapse ', () => {
		const sidebar = new Sidebar(el, gs);
	  	expect(sidebar.shouldMenuCollapse()).toEqual(true);
	});
	it('should return 1 menuHeight', () => {
		const sidebar = new Sidebar(el, gs);
		sidebar.updateSidebarHeight();
	  	expect(sidebar.menuHeight).toEqual(1);
	});
	it('should return isMenuCollapsed true for menuCollapseStateChange', () => {
		const sidebar = new Sidebar(el, gs);
		sidebar.menuCollapseStateChange(true);
	  	expect(sidebar.isMenuCollapsed).toEqual(true);
	});
	it('should return isMenuCollapsed false for menuCollapseStateChange', () => {
		const sidebar = new Sidebar(el, gs);
		sidebar.menuCollapseStateChange(false);
	  	expect(sidebar.isMenuCollapsed).toEqual(false);
	});
	it('should return isMenuCollapsed true for menuCollapse', () => {
		const sidebar = new Sidebar(el, gs);
		sidebar.menuCollapse();
	  	expect(sidebar.isMenuCollapsed).toEqual(true);
	});
	it('should return isMenuCollapsed false for menuExpand', () => {
		const sidebar = new Sidebar(el, gs);
		sidebar.menuExpand();
	  	expect(sidebar.isMenuCollapsed).toEqual(false);
	});
	it('should return isMenuCollapsed true for onWindowResize', () => {
		const sidebar = new Sidebar(el, gs);
		sidebar.onWindowResize();
	  	expect(sidebar.isMenuCollapsed).toEqual(true);
	});
	it('should return ngAfterViewInit false for isMenuCollapsed', () => {
		const sidebar = new Sidebar(el, gs);
		sidebar.ngAfterViewInit();
	  	expect(sidebar.isMenuCollapsed).toEqual(false);
	});
	it('should return ngOnInit true for isMenuCollapsed', () => {
		const sidebar = new Sidebar(el, gs);
		sidebar.ngOnInit();
	  	expect(sidebar.isMenuCollapsed).toEqual(true);
	});

	it('should have a routes object with a path',() => {
		const sidebar = new Sidebar(el, gs);
		expect(sidebar.routes).toBeDefined();
	});

});