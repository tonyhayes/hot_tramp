import { userLicenseReducer } from './user-license.reducer';
import { UserAdministrationActions } from '../../actions';

describe('userLicenseReducer Reducer', () => {
		let actions: UserAdministrationActions;
		let LicenseState: [];

		beforeEach(() => {
			actions = new UserAdministrationActions();
			LicenseState = ['tony', 't'];
		});

		it('uses an initial state when none is given', () => {
			let result = userLicenseReducer(undefined, {type: 'SOME ACTION'});
			expect(result.length).toBe(0);
		});
		it('return payload when ADD_USER_LICENSE is given', () => {
			let result = userLicenseReducer(undefined, actions.addUserLicense(LicenseState));
			expect(result).toBe(LicenseState);
		});
		it('return payload when ADD_USER_LICENSE_SUCCESS is given', () => {
			let result = userLicenseReducer(undefined, actions.addUserLicenseSuccess(LicenseState));
			expect(result).toBe(LicenseState);
		});
	   	it('return payload when ADD_USER_LICENSE_FAILURE is given', () => {
			let result = userLicenseReducer(undefined, actions.addUserLicenseFailure('error'));	    
			expect(result).toEqual({error:'error'});
	  	});
		it('return payload when REMOVE_USER_LICENSE is given', () => {
			let result = userLicenseReducer(undefined, actions.removeUserLicense(LicenseState));
			expect(result).toBe(LicenseState);
		});
		it('return payload when REMOVE_USER_LICENSE_SUCCESS is given', () => {
			let result = userLicenseReducer(undefined, actions.removeUserLicenseSuccess(LicenseState));
			expect(result).toBe(LicenseState);
		});
	   	it('return payload when REMOVE_USER_LICENSE_FAILURE is given', () => {
			let result = userLicenseReducer(undefined, actions.removeUserLicenseFailure('error'));	    
			expect(result).toEqual({error:'error'});
	  	});

});