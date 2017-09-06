import { sendFieldReportReducer  } from './field-report-send.reducer';
import { ProjectManagementActions } from '../../actions';

describe('sendFieldReportReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let sendFieldReportState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		sendFieldReportState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = sendFieldReportReducer(undefined, {type: 'SOME ACTION'});
		expect(result).toBe(undefined);
	});
	it('return payload when sendFieldReportSuccess is given', () => {
		let result = sendFieldReportReducer(undefined, actions.sendFieldReportSuccess(sendFieldReportState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when sendFieldReportFailure is given', () => {
		let result = sendFieldReportReducer(undefined, actions.sendFieldReportFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});