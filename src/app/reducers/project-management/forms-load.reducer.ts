import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type LoadFormsState = any[];

const initialState: any[] = [];

export const loadFormsReducer = function (state = initialState, action: Action): any[] {
	switch (action.type) {
		case ProjectManagementActions.LOAD_FORMS_SUCCESS: {
			return action.payload;
		}
		case ProjectManagementActions.LOAD_FORMS_FAILURE: {
			return action.payload;
		}
		default: {
			return state;
		}
	}
}