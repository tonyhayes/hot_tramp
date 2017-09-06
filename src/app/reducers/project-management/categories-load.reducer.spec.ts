import { loadCategoriesReducer  } from './categories-load.reducer';
import { ProjectManagementActions } from '../../actions';

describe('loadCategoriesReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let loadCategoriesState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		loadCategoriesState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = loadCategoriesReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
	});
	it('return payload when loadCategoriesSuccess is given', () => {
		let result = loadCategoriesReducer(undefined, actions.loadCategoriesSuccess(loadCategoriesState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when loadCategoriesFailure is given', () => {
		let result = loadCategoriesReducer(undefined, actions.loadCategoriesFailure('error'));        
		expect(result).toEqual({ error: 'error' });
	});

});