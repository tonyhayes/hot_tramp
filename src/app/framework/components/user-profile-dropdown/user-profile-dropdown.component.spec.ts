// Load the implementations that should be tested
import { UserProfileDropdown } from './user-profile-dropdown.component';
import { GlobalState } from '../../../global.state';

describe('UserProfileDropdown', () => {
	// provide our implementations or mocks to the dependency injector

	const gs = new GlobalState();

	it('should define UserProfileDropdown', () => {
	  	expect(UserProfileDropdown).toBeDefined();
	});
	it('should construct a UserProfileDropdown', () => {
		const userProfileDropdown = new UserProfileDropdown(gs);
	  	expect(userProfileDropdown.signOut()).toEqual(false);
	});


});