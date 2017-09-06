import { CategoryList } from './category.component';
import {} from 'jasmine'

describe('Category', () => {

	const dashboard = new CategoryList();
	//specs
	it('should create Category', () => {
		expect(dashboard).toBeDefined();
	});

}) 

