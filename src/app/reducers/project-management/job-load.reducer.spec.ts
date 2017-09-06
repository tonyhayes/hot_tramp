import { loadJobReducer  } from './job-load.reducer';
import { ProjectManagementActions } from '../../actions';

describe('loadJobReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let loadJobState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		loadJobState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = loadJobReducer(undefined, {type: 'SOME ACTION'});
		expect(result).toBe(undefined);
	});
	it('return payload when loadJobSuccess is given', () => {
		let result = loadJobReducer(undefined, actions.loadJobSuccess(loadJobState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when loadJobFailure is given', () => {
		let result = loadJobReducer(undefined, actions.loadJobFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});