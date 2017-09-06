import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserBase } from '../../pages/user-administration';
import { UserAdministrationActions } from '../../actions';

export type AdministrationUserDeleteState = UserBase;

let initialState: UserBase

export const userDeleteReducer = function (state = initialState, action: Action): UserBase {
    switch (action.type) {
        // case UserAdministrationActions.ADD_USER: {
        //     return action.payload;
        // }
        case UserAdministrationActions.DELETE_USER_SUCCESS: {
            return action.payload;
        }
        case UserAdministrationActions.DELETE_USER_FAILURE: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}