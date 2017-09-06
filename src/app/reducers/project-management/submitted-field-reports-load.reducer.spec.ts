import { loadSubmittedFieldReportsReducer  } from './submitted-field-reports-load.reducer';
import { ProjectManagementActions } from '../../actions';

describe('loadSubmittedFieldReportsReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let loadSubmittedFieldReportsState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		loadSubmittedFieldReportsState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = loadSubmittedFieldReportsReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
	});
	it('return payload when loadSubmittedFieldReportsSuccess is given', () => {
		let result = loadSubmittedFieldReportsReducer(undefined, actions.loadSubmittedFieldReportsSuccess(loadSubmittedFieldReportsState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when loadSubmittedFieldReportsFailure is given', () => {
		let result = loadSubmittedFieldReportsReducer(undefined, actions.loadSubmittedFieldReportsFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});