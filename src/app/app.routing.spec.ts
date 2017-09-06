// Load the implementations that should be tested
import { routing } from './app.routing';
import {} from 'jasmine'

describe('app.routing', () => {

	it('should have a routing object',() => {
		expect(routing).toBeDefined();
	});
	// it('should have a routes object',() => {
	// 	expect(routes).toBeDefined();
	// });
	// it('should have a routes object with path',() => {
	//     expect(routes[0].path).toEqual('project-management');
	// });
	// it('should have a routes object with redirectTo',() => {
	//     expect(routes[0].redirectTo).toEqual('/project-management');
	// });
	// it('should have a routes object with pathMatch',() => {
	//     expect(routes[0].pathMatch).toEqual('full');
	// });

});