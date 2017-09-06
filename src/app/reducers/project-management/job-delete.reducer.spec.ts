import { deleteJobReducer  } from './job-delete.reducer';
import { ProjectManagementActions } from '../../actions';

describe('deleteJobReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let deleteJobState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		deleteJobState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = deleteJobReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
	});
	it('return payload when deleteJobSuccess is given', () => {
		let result = deleteJobReducer(undefined, actions.deleteJobSuccess(deleteJobState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when deleteJobFailure is given', () => {
		let result = deleteJobReducer(undefined, actions.deleteJobFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});