import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type LoadFieldReportsState = any[];

const initialState: any[] = [];

export const loadFieldReportsReducer = function (state = initialState, action: Action): any[] {
	switch (action.type) {
		case ProjectManagementActions.LOAD_FIELD_REPORTS_SUCCESS: {
			return action.payload;
		}
		case ProjectManagementActions.LOAD_FIELD_REPORTS_FAILURE: {
			return action.payload;
		}
		default: {
			return state;
		}
	}
}