import { loadFormsReducer  } from './forms-load.reducer';
import { ProjectManagementActions } from '../../actions';

describe('loadFormsReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let loadFormsState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		loadFormsState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = loadFormsReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
	});
	it('return payload when loadFormsSuccess is given', () => {
		let result = loadFormsReducer(undefined, actions.loadFormsSuccess(loadFormsState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when loadFormsFailure is given', () => {
		let result = loadFormsReducer(undefined, actions.loadFormsFailure('error'));        
		expect(result).toEqual({ error: 'error' });
	});

});