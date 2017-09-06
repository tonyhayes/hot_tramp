// Load the implementations that should be tested
import { PROJECT_MANAGEMENT_ADMINISTRATION_NAVBAR } from './project-management-administration.navbar';
import {} from 'jasmine'

describe('PROJECT_MANAGEMENT_ADMINISTRATION_NAVBAR', () => {

	it('should have a PROJECT_MANAGEMENT_ADMINISTRATION_NAVBAR object',() => {
		expect(PROJECT_MANAGEMENT_ADMINISTRATION_NAVBAR).toBeDefined();
	});
	it('should have a PROJECT_MANAGEMENT_ADMINISTRATION_NAVBAR object with a path',() => {
		expect(PROJECT_MANAGEMENT_ADMINISTRATION_NAVBAR[0].path).toBeDefined();
	});
	it('should have a PROJECT_MANAGEMENT_ADMINISTRATION_NAVBAR object with a page',() => {
		expect(PROJECT_MANAGEMENT_ADMINISTRATION_NAVBAR[0].path).toEqual('pages');
	});
	it('should have a PROJECT_MANAGEMENT_ADMINISTRATION_NAVBAR object with children',() => {
		expect(PROJECT_MANAGEMENT_ADMINISTRATION_NAVBAR[0].children).toBeDefined();
	});
	it('should have a PROJECT_MANAGEMENT_ADMINISTRATION_NAVBAR object with 0 children',() => {
	    expect(PROJECT_MANAGEMENT_ADMINISTRATION_NAVBAR[0].children.length).toEqual(0);
	});

});