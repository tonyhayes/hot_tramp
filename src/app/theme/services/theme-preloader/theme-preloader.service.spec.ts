import { ThemePreloader } from './theme-preloader.service';

describe('ThemePreloader', () => {
	// provide our implementations or mocks to the dependency injector

	const tp = new ThemePreloader();
	  
  	//specs
	it('should have a ThemePreloader', () => {
		expect(tp).toBeDefined();
	});

}) 

