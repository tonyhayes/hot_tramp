import { licenseAdministrationReducer } from './license-administration.reducer';
import { UserAdministrationActions } from '../../actions';
import { LicenseBase, Application } from '../../pages/user-administration';

describe('licenseAdministrationReducer Reducer', () => {
  	let actions: UserAdministrationActions;
  	let LicenseState: Application[] = [];

  	beforeEach(() => {
		actions = new UserAdministrationActions();
		LicenseState = [{
			  		applicationId: 'Test',
			  		totalCount: 5,
			  		licensesUsed: 2,

				}];
  	});

  	it('uses an initial state when none is given', () => {
		let result = licenseAdministrationReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
  	});
   	it('return payload when LOAD_LICENSES_SUCCESS is given', () => {
		let result = licenseAdministrationReducer(undefined, actions.loadLicensesSuccess(LicenseState));
		expect(result[0].applicationId).toBe('Test');
  	});
   	it('return payload when LOAD_LICENSES_FAILURE is given', () => {
		let result = licenseAdministrationReducer(undefined, actions.loadLicensesFailure('error'));	    
		expect(result).toEqual({error:'error'});
  	});

});