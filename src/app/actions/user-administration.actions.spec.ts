import { UserAdministrationActions } from './user-administration.actions';
import { UserBase } from '../pages/user-administration';
import {} from 'jasmine';

describe('UserAdminstrationActions', () => {
	let actions: UserAdministrationActions;
//	const questions = new UserBase();

	beforeEach(() => {
		actions = new UserAdministrationActions();
	});

	it('returns LOAD_USERS', () => {
		expect(actions.loadUsers().type).toEqual('[UserBase] Load users');
	});
	it('returns LOAD_USERS_SUCCESS', () => {
		expect(actions.loadUsersSuccess(null).type).toEqual('[UserBase] Load Users Success');
	});
	it('returns LOAD_USERS_FAILURE', () => {
		expect(actions.loadUsersFailure(null).type).toEqual('[UserBase] Load Users Failure');
	});
	it('returns LOAD_USER', () => {
		expect(actions.loadUser().type).toEqual('UserBase Load user');
	});
	it('returns LOAD_USER_SUCCESS', () => {
		expect(actions.loadUserSuccess(null).type).toEqual('UserBase Load User Success');
	});
	it('returns LOAD_LICENSES', () => {
		expect(actions.loadLicenses().type).toEqual('[UserBase] Load licenses');
	});
	it('returns LOAD_LICENSES_SUCCESS', () => {
		expect(actions.loadLicensesSuccess(null).type).toEqual('[UserBase] Load licenses Success');
	});
	it('returns LOAD_LICENSES_FAILURE', () => {
		expect(actions.loadLicensesFailure(null).type).toEqual('[UserBase] Load licenses Failure');
	});
	it('returns SAVE_USERS', () => {
		expect(actions.saveUsers('tony').type).toEqual('[UserBase] Save users');
		expect(actions.saveUsers('tony').payload).toEqual('tony');
	});
	it('returns SAVE_USERS_SUCCESS', () => {
		expect(actions.saveUsersSuccess('tony').type).toEqual('[UserBase] Save users Success');
		expect(actions.saveUsersSuccess('tony').payload).toEqual('tony');
	});
	it('returns SAVE_USER', () => {
		expect(actions.saveUser('tony').type).toEqual('UserBase Save user');
		expect(actions.saveUser('tony').payload).toEqual('tony');
	});
	it('returns SAVE_USER_SUCCESS', () => {
		expect(actions.saveUserSuccess('tony').type).toEqual('UserBase Save user Success');
		expect(actions.saveUserSuccess('tony').payload).toEqual('tony');
	});
	it('returns ADD_USER', () => {
		expect(actions.addUser('tony').type).toEqual('UserBase Add user');
		expect(actions.addUser('tony').payload).toEqual('tony');
	});
	it('returns ADD_USER_SUCCESS', () => {
		expect(actions.addUserSuccess('tony').type).toEqual('UserBase Add user Success');
		expect(actions.addUserSuccess('tony').payload).toEqual('tony');
	});
	it('returns ADD_USER_FAILURE', () => {
		expect(actions.addUserFailure('tony').type).toEqual('UserBase Add user Failure');
		expect(actions.addUserFailure('tony').payload).toEqual({error:'tony'});
	});
	it('returns DELETE_USER', () => {
		expect(actions.deleteUser('tony').type).toEqual('UserBase Delete user');
		expect(actions.deleteUser('tony').payload).toEqual('tony');
	});
	it('returns DELETE_USER_SUCCESS', () => {
		expect(actions.deleteUserSuccess('tony').type).toEqual('UserBase Delete user Success');
		expect(actions.deleteUserSuccess('tony').payload).toEqual('tony');
	});
	it('returns DELETE_USER_FAILURE', () => {
		expect(actions.deleteUserFailure('tony').type).toEqual('UserBase Delete user Failure');
		expect(actions.deleteUserFailure('tony').payload).toEqual({error:'tony'});
	});
	it('returns ADD_USER_LICENSE', () => {
		expect(actions.addUserLicense(['tony', 't']).type).toEqual('UserId, applicationId add user license');
		expect(actions.addUserLicense(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns ADD_USER_LICENSE_FAILURE', () => {
		expect(actions.addUserLicenseFailure('tony').type).toEqual('UserId, applicationId add user license Failure');
		expect(actions.addUserLicenseFailure('tony').payload).toEqual({error:'tony'});
	});
	it('returns ADD_USER_LICENSE_SUCCESS', () => {
		expect(actions.addUserLicenseSuccess(['tony', 't']).type).toEqual('UserId, applicationId add user license Success');
		expect(actions.addUserLicenseSuccess(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns REMOVE_USER_LICENSE', () => {
		expect(actions.removeUserLicense(['tony', 't']).type).toEqual('UserId, applicationId remove user license');
		expect(actions.removeUserLicense(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns REMOVE_USER_LICENSE_SUCCESS', () => {
		expect(actions.removeUserLicenseSuccess(['tony', 't']).type).toEqual('UserId, applicationId remove user license Success');
		expect(actions.removeUserLicenseSuccess(['tony', 't']).payload).toEqual(['tony', 't']);
	});
	it('returns REMOVE_USER_LICENSE_FAILURE', () => {
		expect(actions.removeUserLicenseFailure('tony').type).toEqual('UserId, applicationId remove user license Failure');
		expect(actions.removeUserLicenseFailure('tony').payload).toEqual({error:'tony'});
	});
});