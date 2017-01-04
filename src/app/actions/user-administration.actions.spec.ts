import { UserAdministrationActions } from './user-administration.actions';
import { UserBase } from '../pages/user-administration';
describe('UserAdminstrationActions', () => {
	let actions: UserAdministrationActions;
//	const questions = new UserBase();

	beforeEach(() => {
		actions = new UserAdministrationActions();
	});

	it('returns LOAD_USERS', () => {
		expect(actions.loadUsers(null).type).toEqual('[UserBase] Load users');
	});
	it('returns LOAD_USERS_SUCCESS', () => {
		expect(actions.loadUsersSuccess(null).type).toEqual('[UserBase] Load Users Success');
	});
	it('returns SAVE_USERS', () => {
		expect(actions.saveUsers(null, 'tony').type).toEqual('[UserBase] Save users');
		expect(actions.saveUsers(null, 'tony').payload).toEqual('tony');
	});
	it('returns SAVE_USERS_SUCCESS', () => {
		expect(actions.saveUsersSuccess('tony').type).toEqual('[UserBase] Save users Success');
		expect(actions.saveUsersSuccess('tony').payload).toEqual('tony');
	});
});