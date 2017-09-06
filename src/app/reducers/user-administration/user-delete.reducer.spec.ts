import { userDeleteReducer } from './user-delete.reducer';
import { UserAdministrationActions } from '../../actions';
import { UserBase } from '../../pages/user-administration';

describe('user-delete Reducer', () => {
  	let actions: UserAdministrationActions;
  	let UserState;

  	beforeEach(() => {
		actions = new UserAdministrationActions();
		UserState = {
			  		userId: 1,
			  		name: 'Test',
			  		email: 'yeah',
			  		applications: [],

				};
  	});

  	it('uses an initial state when none is given', () => {
		let result = userDeleteReducer(undefined, {type: 'SOME ACTION'});
		expect(result).toBe(undefined);
  	});
  // 	it('return payload when LOAD_USER_SUCCESS is given', () => {
		// let result = userDeleteReducer(undefined, actions.addUser(UserState));
		// expect(result.firstName).toBe('Test');
  // 	});
  	it('return payload when SAVE_USER_SUCCESS is given', () => {
		let result = userDeleteReducer(undefined, actions.deleteUserSuccess(UserState));
		expect(result.name).toBe('Test');
  	});
   	it('return payload when ADD_USER_FAILURE is given', () => {
		let result = userDeleteReducer(undefined, actions.deleteUserFailure('error'));	    
		expect(result).toEqual({error:'error'});
  	});

});