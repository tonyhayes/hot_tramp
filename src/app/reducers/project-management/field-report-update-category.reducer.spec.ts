import { updateFieldReportCategoryReducer  } from './field-report-update-category.reducer';
import { ProjectManagementActions } from '../../actions';

describe('updateFieldReportCategoryReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let updateFieldReportCategoryState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		updateFieldReportCategoryState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = updateFieldReportCategoryReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
	});
	it('return payload when updateFieldReportCategorySuccess is given', () => {
		let result = updateFieldReportCategoryReducer(undefined, actions.updateFieldReportCategorySuccess(updateFieldReportCategoryState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when updateFieldReportCategoryFailure is given', () => {
		let result = updateFieldReportCategoryReducer(undefined, actions.updateFieldReportCategoryFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});