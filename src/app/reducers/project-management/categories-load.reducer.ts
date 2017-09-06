import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type LoadCategoriesState = any[];

const initialState: any[] = [];

export const loadCategoriesReducer = function (state = initialState, action: Action): any[] {
	switch (action.type) {
		case ProjectManagementActions.LOAD_CATEGORIES_SUCCESS: {
			return action.payload;
		}
		case ProjectManagementActions.LOAD_CATEGORIES_FAILURE: {
			return action.payload;
		}
		default: {
			return state;
		}
	}
}