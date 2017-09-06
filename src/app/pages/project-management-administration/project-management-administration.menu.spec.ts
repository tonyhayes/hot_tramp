// Load the implementations that should be tested
import { PROJECT_MANAGEMENT_ADMINISTRATION_MENU } from './project-management-administration.menu';
import {} from 'jasmine'

describe('PROJECT_MANAGEMENT_ADMINISTRATION_MENU', () => {

	it('should have a menu object',() => {
		expect(PROJECT_MANAGEMENT_ADMINISTRATION_MENU).toBeDefined();
	});
	// it('should have a PROJECT_MANAGEMENT_ADMINISTRATION_MENU object with a path',() => {
	// 	expect(PROJECT_MANAGEMENT_ADMINISTRATION_MENU[0].path).toBeDefined();
	// });
	// it('should have a PROJECT_MANAGEMENT_ADMINISTRATION_MENU object with a page',() => {
	// 	expect(PROJECT_MANAGEMENT_ADMINISTRATION_MENU[0].path).toEqual('project-management');
	// });
	// it('should have a PROJECT_MANAGEMENT_ADMINISTRATION_MENU object with children',() => {
	// 	expect(PROJECT_MANAGEMENT_ADMINISTRATION_MENU[0].children).toBeDefined();
	// });
	// it('should have a PROJECT_MANAGEMENT_ADMINISTRATION_MENU object with 1 children',() => {
	//     expect(PROJECT_MANAGEMENT_ADMINISTRATION_MENU[0].children.length).toEqual(0);
	// });

});