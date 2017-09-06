import { loadFieldReportsReducer  } from './field-reports-load.reducer';
import { ProjectManagementActions } from '../../actions';

describe('loadFieldReportsReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let loadFieldReportsState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		loadFieldReportsState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = loadFieldReportsReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
	});
	it('return payload when loadFieldReportsSuccess is given', () => {
		let result = loadFieldReportsReducer(undefined, actions.loadFieldReportsSuccess(loadFieldReportsState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when loadFieldReportsFailure is given', () => {
		let result = loadFieldReportsReducer(undefined, actions.loadFieldReportsFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});