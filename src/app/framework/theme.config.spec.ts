import { ThemeConfig } from './theme.config';
import { colorHelper } from './theme.constants';
import { ThemeConfigService } from './theme.config.service';

describe('ThemeConfig', () => {
	// provide our implementations or mocks to the dependency injector

	const tcp = new ThemeConfigService();
	const tc = new ThemeConfig(tcp);
	  
  	//specs
	it('should have a BaThemeConfig', () => {
		expect(tc).toBeDefined();
	});

}) 

