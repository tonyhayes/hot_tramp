import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type LoadProjectsState = any[];

const initialState: any[] = [];

export const loadProjectsReducer = function (state = initialState, action: Action): any[] {
	switch (action.type) {
		case ProjectManagementActions.LOAD_PROJECTS_SUCCESS: {
			return action.payload;
		}
		case ProjectManagementActions.LOAD_PROJECTS_FAILURE: {
			return action.payload;
		}
		default: {
			return state;
		}
	}
}