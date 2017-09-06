import { loadProjectsReducer  } from './projects-load.reducer';
import { ProjectManagementActions } from '../../actions';

describe('loadProjectsReducer Reducer', () => {
	let actions: ProjectManagementActions;
	let loadProjectsState: any[] = [];

	beforeEach(() => {
		actions = new ProjectManagementActions();
		loadProjectsState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = loadProjectsReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
	});
	it('return payload when loadProjectsSuccess is given', () => {
		let result = loadProjectsReducer(undefined, actions.loadProjectsSuccess(loadProjectsState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when loadProjectsFailure is given', () => {
		let result = loadProjectsReducer(undefined, actions.loadProjectsFailure('error'));        
		expect(result).toEqual({ error: 'error' });
	});

});