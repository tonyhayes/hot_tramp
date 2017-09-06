import { loadProjectReducer  } from './project-load.reducer';
import { ProjectManagementActions } from '../../actions';

describe('loadProjectReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let loadProjectState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		loadProjectState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = loadProjectReducer(undefined, {type: 'SOME ACTION'});
		expect(result).toBe(undefined);
	});
	it('return payload when loadProjectSuccess is given', () => {
		let result = loadProjectReducer(undefined, actions.loadProjectSuccess(loadProjectState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when loadProjectFailure is given', () => {
		let result = loadProjectReducer(undefined, actions.loadProjectFailure('error'));        
		expect(result).toEqual({error:'error'});
	});

});