import { ThemeSpinner } from './theme-spinner.service';

describe('ThemeSpinner', () => {
	// provide our implementations or mocks to the dependency injector

	const sp = new ThemeSpinner();
	  
  	//specs
	it('should have a ThemeSpinner', () => {
		console.log(sp)
		expect(sp).toBeDefined();
	});

}) 

