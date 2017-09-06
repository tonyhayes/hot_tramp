import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserAdministrationActions } from '../../actions';

export type UserLicenseState = any[];

const initialState = [];

export const userLicenseReducer = function (state = initialState, action: Action): any[] {
	switch (action.type) {
		case UserAdministrationActions.ADD_USER_LICENSE: {
			return action.payload;
		}
		case UserAdministrationActions.ADD_USER_LICENSE_SUCCESS: {
			return action.payload;
		}
		case UserAdministrationActions.ADD_USER_LICENSE_FAILURE: {
			return action.payload;
		}
		case UserAdministrationActions.REMOVE_USER_LICENSE: {
			return action.payload;
		}
		case UserAdministrationActions.REMOVE_USER_LICENSE_SUCCESS: {
			return action.payload;
		}
		case UserAdministrationActions.REMOVE_USER_LICENSE_FAILURE: {
			return action.payload;
		}
		default: {
			return state;
		}
	}
}