import { deleteCategoryReducer  } from './category-delete.reducer';
import { ProjectManagementActions } from '../../actions';

describe('deleteCategoryReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let deleteCategoryState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		deleteCategoryState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = deleteCategoryReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
	});
	it('return payload when deleteCategorySuccess is given', () => {
		let result = deleteCategoryReducer(undefined, actions.deleteCategorySuccess(deleteCategoryState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when deleteCategoryFailure is given', () => {
		let result = deleteCategoryReducer(undefined, actions.deleteCategoryFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});