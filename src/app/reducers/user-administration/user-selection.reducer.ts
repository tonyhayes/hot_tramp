import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserBase } from '../../pages/user-administration';
import { UserAdministrationActions } from '../../actions';

export type AdministrationUserState = UserBase;

let initialState: UserBase

export const userSelectionReducer = function (state = initialState, action: Action): UserBase {
    switch (action.type) {
        case UserAdministrationActions.LOAD_USER_SUCCESS: {
            return action.payload;
        }
        case UserAdministrationActions.SAVE_USER_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}