import { loadFormReducer  } from './form-load.reducer';
import { ProjectManagementActions } from '../../actions';

describe('loadFormReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let loadFormState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		loadFormState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = loadFormReducer(undefined, {type: 'SOME ACTION'});
		expect(result).toBe(undefined);
	});
	it('return payload when loadFormSuccess is given', () => {
		let result = loadFormReducer(undefined, actions.loadFormSuccess(loadFormState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when loadFormFailure is given', () => {
		let result = loadFormReducer(undefined, actions.loadFormFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});