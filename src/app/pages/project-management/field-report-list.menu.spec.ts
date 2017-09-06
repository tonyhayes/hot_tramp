// Load the implementations that should be tested
import { FIELD_MENU } from './field-report-list.menu';
import {} from 'jasmine'

describe('FIELD_MENU', () => {

	it('should have a menu object',() => {
		expect(FIELD_MENU).toBeDefined();
	});
	it('should have a FIELD_MENU object with a path',() => {
		expect(FIELD_MENU[0].path).toBeDefined();
	});
	it('should have a FIELD_MENU object with a page',() => {
		expect(FIELD_MENU[0].path).toEqual('project-management');
	});
	it('should have a FIELD_MENU object with children',() => {
		expect(FIELD_MENU[0].children).toBeDefined();
	});
	it('should have a FIELD_MENU object with 1 children',() => {
	    expect(FIELD_MENU[0].children.length).toEqual(0);
	});

});