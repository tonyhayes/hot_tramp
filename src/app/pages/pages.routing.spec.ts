// Load the implementations that should be tested
import { routing } from './pages.routing';

describe('app.routing', () => {

	it('should have a routing object',() => {
		console.log(routing);
		expect(routing).toBeDefined();
	});

});