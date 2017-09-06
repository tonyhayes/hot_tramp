import { loadedFieldReportReducer  } from './field-report-loaded.reducer';
import { ProjectManagementActions } from '../../actions';

describe('loadedFieldReportReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let loadedFieldReportState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		loadedFieldReportState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	  });

	it('uses an initial state when none is given', () => {
		let result = loadedFieldReportReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
	});
	it('return payload when loadFieldReportSuccess is given', () => {
		let result = loadedFieldReportReducer(undefined, actions.getLoadedFieldReportSuccess(loadedFieldReportState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when loadFieldReportFailure is given', () => {
		let result = loadedFieldReportReducer(undefined, actions.getLoadedFieldReportFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});