import { decorateModuleRef, ENV_PROVIDERS } from './environment';

describe('environment', () => {

	//specs
	it('should return decorateModuleRef', () => {
		const env = decorateModuleRef;
		console.log(env)
		expect(env).toBeDefined();
	});
		it('should return ENV_PROVIDERS', () => {
		console.log(ENV_PROVIDERS)
		expect(ENV_PROVIDERS).toBeDefined();
	});
}) 

