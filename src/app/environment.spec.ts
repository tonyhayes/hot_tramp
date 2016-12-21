import { decorateModuleRef, ENV_PROVIDERS } from './environment';

describe('environment', () => {

	//specs
	it('should return decorateModuleRef', () => {
		const env = decorateModuleRef;
		expect(env).toBeDefined();
	});
		it('should return ENV_PROVIDERS', () => {
		expect(ENV_PROVIDERS).toBeDefined();
	});
}) 

