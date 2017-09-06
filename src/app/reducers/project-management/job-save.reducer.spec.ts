import { saveJobReducer  } from './job-save.reducer';
import { ProjectManagementActions } from '../../actions';

describe('saveJobReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let saveJobState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		saveJobState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = saveJobReducer(undefined, {type: 'SOME ACTION'});
		expect(result).toBe(undefined);
	});
	it('return payload when saveJobSuccess is given', () => {
		let result = saveJobReducer(undefined, actions.saveJobSuccess(saveJobState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when saveJobFailure is given', () => {
		let result = saveJobReducer(undefined, actions.saveJobFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});