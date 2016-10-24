// Load the implementations that should be tested
import { MenuItem } from './menu-item.component';

describe('MenuItem', () => {
	// provide our implementations or mocks to the dependency injector

	const menuItem = new MenuItem();
	it('should define MenuItem', () => {
	  	expect(MenuItem).toBeDefined();
	});
	it('should construct menuItem', () => {
	  	expect(menuItem).toBeDefined();
	});
	it('should run onHoverItem ', () => {
		menuItem.onHoverItem('tony')
	  	expect(menuItem.itemHover.closed).toEqual(false);
	});
	it('should run onToggleSubMenu ', () => {
		const e = {
			currentTarget{
				clientHeight: 47,
				getBoundingClientRect: ()=>{
					return {top: 67}
				}
			},
			item:{

			}
		}
		menuItem.onToggleSubMenu(e, 'bad')
	  	expect(menuItem.toggleSubMenu.closed).toEqual(false);
	});


});