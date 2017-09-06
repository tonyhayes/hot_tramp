import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserBase } from '../../pages/user-administration';
import { UserAdministrationActions } from '../../actions';

export type AdministrationUserAddState = UserBase;

let initialState: UserBase

export const userAddReducer = function (state = initialState, action: Action): UserBase {
    switch (action.type) {
        // case UserAdministrationActions.ADD_USER: {
        //     return action.payload;
        // }
        case UserAdministrationActions.ADD_USER_SUCCESS: {
            return action.payload;
        }
        case UserAdministrationActions.ADD_USER_FAILURE: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}