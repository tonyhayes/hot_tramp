import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserBase } from '../../pages/user-administration';
import { UserAdministrationActions } from '../../actions';

export type AdministrationUsersState = UserBase[];

const initialState: UserBase[] = [];

export const userAdministrationReducer = function (state = initialState, action: Action): UserBase[] {
    switch (action.type) {
        case UserAdministrationActions.LOAD_USERS_SUCCESS: {
            return action.payload;
        }
        case UserAdministrationActions.LOAD_USERS_FAILURE: {
            return action.payload;
        }
        case UserAdministrationActions.SAVE_USERS_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}