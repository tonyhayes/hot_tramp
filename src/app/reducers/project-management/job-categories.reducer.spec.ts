import { jobCategoriesReducer  } from './job-categories.reducer';
import { ProjectManagementActions } from '../../actions';

describe('jobCategoriesReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let JobCategoriesState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		JobCategoriesState = [{
					  applicationId: 'Test',
					  totalCount: 5,
					  licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = jobCategoriesReducer(undefined, {type: 'SOME ACTION'});
		expect(result).toBe(undefined);
	});
	it('return payload when loadJobCodesSuccess is given', () => {
		let result = jobCategoriesReducer(undefined, actions.loadJobCategoriesSuccess(JobCategoriesState));
		expect(result[0].applicationId).toBe('Test');
	});
	it('return payload when loadJobCodesFailure is given', () => {
		let result = jobCategoriesReducer(undefined, actions.loadJobCategoriesFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});