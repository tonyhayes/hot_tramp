import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type LoadJobsState = any[];

const initialState: any[] = [];

export const loadJobsReducer = function (state = initialState, action: Action): any[] {
	switch (action.type) {
		case ProjectManagementActions.LOAD_JOBS_SUCCESS: {
			return action.payload;
		}
		case ProjectManagementActions.LOAD_JOBS_FAILURE: {
			return action.payload;
		}
		default: {
			return state;
		}
	}
}