import { saveFormReducer  } from './form-save.reducer';
import { ProjectManagementActions } from '../../actions';

describe('saveFormReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let saveFormState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		saveFormState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = saveFormReducer(undefined, {type: 'SOME ACTION'});
		expect(result).toBe(undefined);
	});
	it('return payload when saveFormSuccess is given', () => {
		let result = saveFormReducer(undefined, actions.saveFormSuccess(saveFormState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when saveFormFailure is given', () => {
		let result = saveFormReducer(undefined, actions.saveFormFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});