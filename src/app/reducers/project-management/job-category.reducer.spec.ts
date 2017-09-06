import { jobCategoryReducer  } from './job-category.reducer';
import { ProjectManagementActions } from '../../actions';

describe('jobCategoryReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let JobCategoryState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		JobCategoryState = [{
					  applicationId: 'Test',
					  totalCount: 5,
					  licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = jobCategoryReducer(undefined, {type: 'SOME ACTION'});
		expect(result).toBe(undefined);
	});
	it('return payload when loadJobCategorySuccess is given', () => {
		let result = jobCategoryReducer(undefined, actions.loadJobCategorySuccess(JobCategoryState));
		expect(result[0].applicationId).toBe('Test');
	});
	it('return payload when loadJobCategoryFailure is given', () => {
		let result = jobCategoryReducer(undefined, actions.loadJobCategoryFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});