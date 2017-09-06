import { saveCategoryReducer  } from './category-save.reducer';
import { ProjectManagementActions } from '../../actions';

describe('saveCategoryReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let saveCategoryState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		saveCategoryState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = saveCategoryReducer(undefined, {type: 'SOME ACTION'});
		expect(result).toBe(undefined);
	});
	it('return payload when saveCategorySuccess is given', () => {
		let result = saveCategoryReducer(undefined, actions.saveCategorySuccess(saveCategoryState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when saveCategoryFailure is given', () => {
		let result = saveCategoryReducer(undefined, actions.saveCategoryFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});