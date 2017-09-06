import { saveProjectReducer  } from './project-save.reducer';
import { ProjectManagementActions } from '../../actions';

describe('saveProjectReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let saveProjectState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		saveProjectState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = saveProjectReducer(undefined, {type: 'SOME ACTION'});
		expect(result).toBe(undefined);
	});
	it('return payload when saveProjectSuccess is given', () => {
		let result = saveProjectReducer(undefined, actions.saveProjectSuccess(saveProjectState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when saveProjectFailure is given', () => {
		let result = saveProjectReducer(undefined, actions.saveProjectFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});