import { deleteFieldReportReducer  } from './field-report-delete.reducer';
import { ProjectManagementActions } from '../../actions';

describe('deleteFieldReportReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let deleteFieldReportState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		deleteFieldReportState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = deleteFieldReportReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
	});
	it('return payload when deleteFieldReportSuccess is given', () => {
		let result = deleteFieldReportReducer(undefined, actions.deleteFieldReportSuccess(deleteFieldReportState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when deleteFieldReportFailure is given', () => {
		let result = deleteFieldReportReducer(undefined, actions.deleteFieldReportFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});