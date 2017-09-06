import { jobCodesReducer  } from './job-codes.reducer';
import { ProjectManagementActions } from '../../actions';

describe('jobCodesReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let JobCodeState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		JobCodeState = [{
					  applicationId: 'Test',
					  totalCount: 5,
					  licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = jobCodesReducer(undefined, {type: 'SOME ACTION'});
		expect(result).toBe(undefined);
	});
	it('return payload when loadJobCodesSuccess is given', () => {
		let result = jobCodesReducer(undefined, actions.loadJobCodesSuccess(JobCodeState));
		expect(result[0].applicationId).toBe('Test');
	});
	it('return payload when loadJobCodesFailure is given', () => {
		let result = jobCodesReducer(undefined, actions.loadJobCodesFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});