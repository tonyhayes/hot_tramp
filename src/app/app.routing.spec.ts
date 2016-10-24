// Load the implementations that should be tested
import { routing, routes } from './app.routing';

describe('app.routing', () => {

	it('should have a routing object',() => {
		console.log(routing);
		expect(routing).toBeDefined();
	}));
	it('should have a routes object',() => {
		console.log(routes);
		expect(routes).toBeDefined();
	}));
	it('should have a routes object with path',() => {
	    expect(routes[0].path).toEqual('');
	}));
	it('should have a routes object with redirectTo',() => {
	    expect(routes[0].redirectTo).toEqual('pages');
	}));
	it('should have a routes object with pathMatch',() => {
	    expect(routes[0].pathMatch).toEqual('full');
	}));

});