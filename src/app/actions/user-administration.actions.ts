import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class UserAdministrationActions {
    static LOAD_USERS = '[UserBase] Load users';
    loadUsers(endPoint): Action {
        return {
            type: UserAdministrationActions.LOAD_USERS,
            payload: endPoint
        };
    }

    static LOAD_USERS_SUCCESS = '[UserBase] Load Users Success';
    loadUsersSuccess(users): Action {
        return {
            type: UserAdministrationActions.LOAD_USERS_SUCCESS,
            payload: users
        };
    }

    static SAVE_USERS = '[UserBase] Save users';
    saveUsers(endPoint, users): Action {
        return {
            type: UserAdministrationActions.SAVE_USERS,
            payload: (endPoint, users)
        };
    }

    static SAVE_USERS_SUCCESS = '[UserBase] Save users Success';
    saveUsersSuccess(users): Action {
        return {
            type: UserAdministrationActions.SAVE_USERS_SUCCESS,
            payload: users
        };
    }


}