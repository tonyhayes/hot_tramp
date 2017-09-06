import { ProjectList } from './project.component';
import {} from 'jasmine'

describe('Project', () => {

	const dashboard = new ProjectList();
	//specs
	it('should create Project', () => {
		expect(dashboard).toBeDefined();
	});

}) 

