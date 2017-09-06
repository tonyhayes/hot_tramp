import { deleteProjectReducer  } from './project-delete.reducer';
import { ProjectManagementActions } from '../../actions';

describe('deleteProjectReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let deleteProjectState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		deleteProjectState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = deleteProjectReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
	});
	it('return payload when deleteProjectSuccess is given', () => {
		let result = deleteProjectReducer(undefined, actions.deleteProjectSuccess(deleteProjectState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when deleteProjectFailure is given', () => {
		let result = deleteProjectReducer(undefined, actions.deleteProjectFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});