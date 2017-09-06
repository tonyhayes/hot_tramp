import { userSelectionReducer } from './user-selection.reducer';
import { UserAdministrationActions } from '../../actions';
import { UserBase } from '../../pages/user-administration';

describe('user-selection Reducer', () => {
  	let actions: UserAdministrationActions;
  	let UserState: UserBase;

  	beforeEach(() => {
		actions = new UserAdministrationActions();
		UserState = {
			  		id: 1,
			  		firstName: 'Test',
			  		lastName: 'whoooooo',
			  		username: 'cabbage',
			  		email: 'yeah',
			  		applications: [],

				};
  	});

  	it('uses an initial state when none is given', () => {
		let result = userSelectionReducer(undefined, {type: 'SOME ACTION'});
		expect(result).toBe(undefined);
  	});
  	it('return payload when LOAD_USER_SUCCESS is given', () => {
		let result = userSelectionReducer(undefined, actions.loadUserSuccess(UserState));
		expect(result.firstName).toBe('Test');
  	});
  	it('return payload when SAVE_USER_SUCCESS is given', () => {
		let result = userSelectionReducer(undefined, actions.saveUserSuccess(UserState));
		expect(result.firstName).toBe('Test');
  	});

});