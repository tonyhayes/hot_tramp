import { loadCategoryReducer  } from './category-load.reducer';
import { ProjectManagementActions } from '../../actions';

describe('loadCategoryReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let loadCategoryState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		loadCategoryState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = loadCategoryReducer(undefined, {type: 'SOME ACTION'});
		expect(result).toBe(undefined);
	});
	it('return payload when loadCategorySuccess is given', () => {
		let result = loadCategoryReducer(undefined, actions.loadCategorySuccess(loadCategoryState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when loadCategoryFailure is given', () => {
		let result = loadCategoryReducer(undefined, actions.loadCategoryFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});