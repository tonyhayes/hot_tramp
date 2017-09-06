import { loadedFieldReportsReducer  } from './field-reports-loaded.reducer';
import { ProjectManagementActions } from '../../actions';

describe('loadedFieldReportsReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let loadedFieldReportsState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		loadedFieldReportsState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	  });

	it('uses an initial state when none is given', () => {
		let result = loadedFieldReportsReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
	});
	it('return payload when loadFieldReportsSuccess is given', () => {
		let result = loadedFieldReportsReducer(undefined, actions.getLoadedFieldReportsSuccess(loadedFieldReportsState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when loadFieldReportsFailure is given', () => {
		let result = loadedFieldReportsReducer(undefined, actions.getLoadedFieldReportsFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});