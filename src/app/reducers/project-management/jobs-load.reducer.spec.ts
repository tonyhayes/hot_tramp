import { loadJobsReducer  } from './jobs-load.reducer';
import { ProjectManagementActions } from '../../actions';

describe('loadJobsReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let loadJobsState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		loadJobsState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = loadJobsReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
	});
	it('return payload when loadJobsSuccess is given', () => {
		let result = loadJobsReducer(undefined, actions.loadJobsSuccess(loadJobsState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when loadJobsFailure is given', () => {
		let result = loadJobsReducer(undefined, actions.loadJobsFailure('error'));        
		expect(result).toEqual({ error: 'error' });
	});

});