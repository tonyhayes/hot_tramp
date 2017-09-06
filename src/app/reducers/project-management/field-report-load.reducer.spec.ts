import { loadFieldReportReducer  } from './field-report-load.reducer';
import { ProjectManagementActions } from '../../actions';

describe('loadFieldReportReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let loadFieldReportState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		loadFieldReportState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = loadFieldReportReducer(undefined, {type: 'SOME ACTION'});
		expect(result).toBe(undefined);
	});
	it('return payload when loadFieldReportSuccess is given', () => {
		let result = loadFieldReportReducer(undefined, actions.loadFieldReportSuccess(loadFieldReportState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when loadFieldReportFailure is given', () => {
		let result = loadFieldReportReducer(undefined, actions.loadFieldReportFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});