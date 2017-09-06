import { deleteFormReducer  } from './form-delete.reducer';
import { ProjectManagementActions } from '../../actions';

describe('deleteFormReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let deleteFormState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		deleteFormState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = deleteFormReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
	});
	it('return payload when deleteFormSuccess is given', () => {
		let result = deleteFormReducer(undefined, actions.deleteFormSuccess(deleteFormState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when deleteFormFailure is given', () => {
		let result = deleteFormReducer(undefined, actions.deleteFormFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});