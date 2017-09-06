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
	it('should run getPath - empty array ', () => {
	  	expect(menuItem.getPath([],'tony')).toEqual(undefined);
	});
	it('should run getPath - empty path ', () => {
	  	expect(menuItem.getPath(['tony'], null)).toEqual(undefined);
	});
	it('should run getPath - notes ', () => {
		const item = {
			componentType: 'notes',
			title: 'ta-da'
		}
		menuItem.jobNumber = 7
	  	expect(menuItem.getPath(['tony'], item).length).toEqual(4);
	});
	it('should run getPath - notes - run it twice ', () => {
		const item = {
			componentType: 'notes',
			title: 'ta-da'
		}
		menuItem.jobNumber = 7
		let arr = menuItem.getPath(['tony'], item)
	  	expect(arr.length).toEqual(4);
	  	expect(menuItem.getPath(arr, item).length).toEqual(4);
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