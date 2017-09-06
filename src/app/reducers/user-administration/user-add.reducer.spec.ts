import { userAddReducer } from './user-add.reducer';
import { UserAdministrationActions } from '../../actions';
import { UserBase } from '../../pages/user-administration';

describe('user-add Reducer', () => {
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
		let result = userAddReducer(undefined, {type: 'SOME ACTION'});
		expect(result).toBe(undefined);
  	});
  // 	it('return payload when LOAD_USER_SUCCESS is given', () => {
		// let result = userAddReducer(undefined, actions.addUser(UserState));
		// expect(result.firstName).toBe('Test');
  // 	});
  	it('return payload when SAVE_USER_SUCCESS is given', () => {
		let result = userAddReducer(undefined, actions.addUserSuccess(UserState));
		expect(result.firstName).toBe('Test');
  	});
   	it('return payload when ADD_USER_FAILURE is given', () => {
		let result = userAddReducer(undefined, actions.addUserFailure('error'));	    
		expect(result).toEqual({error:'error'});
  	});

});