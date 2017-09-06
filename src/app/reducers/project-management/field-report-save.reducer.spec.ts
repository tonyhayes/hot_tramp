import { saveFieldReportReducer  } from './field-report-save.reducer';
import { ProjectManagementActions } from '../../actions';

describe('saveFieldReportReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let saveFieldReportState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		saveFieldReportState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = saveFieldReportReducer(undefined, {type: 'SOME ACTION'});
		expect(result).toBe(undefined);
	});
	it('return payload when saveFieldReportSuccess is given', () => {
		let result = saveFieldReportReducer(undefined, actions.saveFieldReportSuccess(saveFieldReportState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when saveFieldReportFailure is given', () => {
		let result = saveFieldReportReducer(undefined, actions.saveFieldReportFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});