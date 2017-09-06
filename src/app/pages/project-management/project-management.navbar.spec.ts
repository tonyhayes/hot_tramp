// Load the implementations that should be tested
import { PROJECT_MANAGEMENT_NAVBAR } from './project-management.navbar';
import {} from 'jasmine'

describe('PROJECT_MANAGEMENT_NAVBAR', () => {

	it('should have a PROJECT_MANAGEMENT_NAVBAR object',() => {
		expect(PROJECT_MANAGEMENT_NAVBAR).toBeDefined();
	});
	it('should have a PROJECT_MANAGEMENT_NAVBAR object with a path',() => {
		expect(PROJECT_MANAGEMENT_NAVBAR[0].path).toBeDefined();
	});
	it('should have a PROJECT_MANAGEMENT_NAVBAR object with a page',() => {
		expect(PROJECT_MANAGEMENT_NAVBAR[0].path).toEqual('pages');
	});
	it('should have a PROJECT_MANAGEMENT_NAVBAR object with children',() => {
		expect(PROJECT_MANAGEMENT_NAVBAR[0].children).toBeDefined();
	});
	it('should have a PROJECT_MANAGEMENT_NAVBAR object with 0 children',() => {
	    expect(PROJECT_MANAGEMENT_NAVBAR[0].children.length).toEqual(0);
	});

});