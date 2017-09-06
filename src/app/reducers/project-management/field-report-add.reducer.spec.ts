import { addFieldReportReducer  } from './field-report-add.reducer';
import { ProjectManagementActions } from '../../actions';

describe('addFieldReportReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let addFieldReportState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		addFieldReportState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = addFieldReportReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
	});
	it('return payload when addFieldReportSuccess is given', () => {
		let result = addFieldReportReducer(undefined, actions.addFieldReportSuccess(addFieldReportState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when addFieldReportFailure is given', () => {
		let result = addFieldReportReducer(undefined, actions.addFieldReportFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});