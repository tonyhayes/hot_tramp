import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type LoadSubmittedFieldReportsState = any[];

const initialState: any[] = [];

export const loadSubmittedFieldReportsReducer = function (state = initialState, action: Action): any[] {
	switch (action.type) {
		case ProjectManagementActions.LOAD_SUBMITTED_FIELD_REPORTS_SUCCESS: {
			return action.payload;
		}
		case ProjectManagementActions.LOAD_SUBMITTED_FIELD_REPORTS_FAILURE: {
			return action.payload;
		}
		default: {
			return state;
		}
	}
}