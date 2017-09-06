import { LoggedOut } from './logged-out.component';
import {} from 'jasmine'

describe('LoggedOut', () => {

	const loggedOut = new LoggedOut();
	//specs
	it('should create LoggedOut', () => {
		expect(loggedOut).toBeDefined();
	});
	it('should retrun getLogOffRedirect', () => {
		expect(loggedOut.getLogOffRedirect()).toContain('http://localhost:7000/');
	});

}) 

