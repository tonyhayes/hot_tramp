import { userAdministrationReducer } from './user-administration.reducer';
import { UserAdministrationActions } from '../../actions';
import { UserBase } from '../../pages/user-administration';

describe('user-administration Reducer', () => {
  	let actions: UserAdministrationActions;
  	let UserState: UserBase[] = [];

  	beforeEach(() => {
		actions = new UserAdministrationActions();
		UserState = [{
			  		id: 1,
			  		firstName: 'Test',
			  		lastName: 'whoooooo',
			  		username: 'cabbage',
			  		email: 'yeah',
			  		applications: [],

				}];
  	});

  	it('uses an initial state when none is given', () => {
		let result = userAdministrationReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
  	});
  	it('return payload when LOAD_USERS_SUCCESS is given', () => {
		let result = userAdministrationReducer(undefined, actions.loadUsersSuccess(UserState));
		expect(result[0].firstName).toBe('Test');
  	});
  	it('return payload when SAVE_USERS_SUCCESS is given', () => {
		let result = userAdministrationReducer(undefined, actions.saveUsersSuccess(UserState));
		expect(result[0].firstName).toBe('Test');
  	});
   	it('return payload when LOAD_USERS_FAILURE is given', () => {
		let result = userAdministrationReducer(undefined, actions.loadUsersFailure('error'));	    
		expect(result).toEqual({error:'error'});
  	});

});