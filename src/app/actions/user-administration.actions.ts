import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class UserAdministrationActions {
    static LOAD_USERS = '[UserBase] Load users';
    loadUsers(): Action {
        return {
            type: UserAdministrationActions.LOAD_USERS,
        };
    }

    static LOAD_USERS_SUCCESS = '[UserBase] Load Users Success';
    loadUsersSuccess(users): Action {
        return {
            type: UserAdministrationActions.LOAD_USERS_SUCCESS,
            payload: users
        };
    }
    static LOAD_USERS_FAILURE = '[UserBase] Load Users Failure';
    loadUsersFailure(error): Action {
        return {
            type: UserAdministrationActions.LOAD_USERS_FAILURE,
            payload: { error: error }
        };
    }
    static LOAD_USER = 'UserBase Load user';
    loadUser(): Action {
        return {
            type: UserAdministrationActions.LOAD_USER,
        };
    }

    static LOAD_USER_SUCCESS = 'UserBase Load User Success';
    loadUserSuccess(user): Action {
        return {
            type: UserAdministrationActions.LOAD_USER_SUCCESS,
            payload: user
        };
    }
    static LOAD_LICENSES = '[UserBase] Load licenses';
    loadLicenses(): Action {
        return {
            type: UserAdministrationActions.LOAD_LICENSES,
        };
    }

    static LOAD_LICENSES_SUCCESS = '[UserBase] Load licenses Success';
    loadLicensesSuccess(licenses): Action {
        return {
            type: UserAdministrationActions.LOAD_LICENSES_SUCCESS,
            payload: licenses
        };
    }
    static LOAD_LICENSES_FAILURE = '[UserBase] Load licenses Failure';
    loadLicensesFailure(error): Action {
        return {
            type: UserAdministrationActions.LOAD_LICENSES_FAILURE,
            payload: {error: error}
        };
    }

    static SAVE_USERS = '[UserBase] Save users';
    saveUsers(users): Action {
        return {
            type: UserAdministrationActions.SAVE_USERS,
            payload: (users)
        };
    }

    static SAVE_USERS_SUCCESS = '[UserBase] Save users Success';
    saveUsersSuccess(users): Action {
        return {
            type: UserAdministrationActions.SAVE_USERS_SUCCESS,
            payload: users
        };
    }
    static ADD_USER_LICENSE = 'UserId, applicationId add user license';
    addUserLicense(license): Action {
        return {
            type: UserAdministrationActions.ADD_USER_LICENSE,
            payload: (license)
        };
    }

    static ADD_USER_LICENSE_SUCCESS = 'UserId, applicationId add user license Success';
    addUserLicenseSuccess(license): Action {
        return {
            type: UserAdministrationActions.ADD_USER_LICENSE_SUCCESS,
            payload: (license)
        };
    }
    static ADD_USER_LICENSE_FAILURE = 'UserId, applicationId add user license Failure';
    addUserLicenseFailure(error): Action {
        return {
            type: UserAdministrationActions.ADD_USER_LICENSE_FAILURE,
            payload: ({error: error})
        };
    }
    static REMOVE_USER_LICENSE = 'UserId, applicationId remove user license';
    removeUserLicense(license): Action {
        return {
            type: UserAdministrationActions.REMOVE_USER_LICENSE,
            payload: (license)
        };
    }

    static REMOVE_USER_LICENSE_SUCCESS = 'UserId, applicationId remove user license Success';
    removeUserLicenseSuccess(license): Action {
        return {
            type: UserAdministrationActions.REMOVE_USER_LICENSE_SUCCESS,
            payload: (license)
        };
    }
    static REMOVE_USER_LICENSE_FAILURE = 'UserId, applicationId remove user license Failure';
    removeUserLicenseFailure(error): Action {
        return {
            type: UserAdministrationActions.REMOVE_USER_LICENSE_FAILURE,
            payload: ({error: error})
        };
    }
    static SAVE_USER = 'UserBase Save user';
    saveUser(user): Action {
        return {
            type: UserAdministrationActions.SAVE_USER,
            payload: (user)
        };
    }

    static SAVE_USER_SUCCESS = 'UserBase Save user Success';
    saveUserSuccess(user): Action {
        return {
            type: UserAdministrationActions.SAVE_USER_SUCCESS,
            payload: user
        };
    }
    static ADD_USER = 'UserBase Add user';
    addUser(user): Action {
        return {
            type: UserAdministrationActions.ADD_USER,
            payload: (user)
        };
    }

    static ADD_USER_SUCCESS = 'UserBase Add user Success';
    addUserSuccess(user): Action {
        return {
            type: UserAdministrationActions.ADD_USER_SUCCESS,
            payload: user
        };
    }
    static ADD_USER_FAILURE = 'UserBase Add user Failure';
    addUserFailure(error): Action {
        return {
            type: UserAdministrationActions.ADD_USER_FAILURE,
            payload: {error: error}
        };
    }
    static DELETE_USER = 'UserBase Delete user';
    deleteUser(user): Action {
        return {
            type: UserAdministrationActions.DELETE_USER,
            payload: (user)
        };
    }

    static DELETE_USER_SUCCESS = 'UserBase Delete user Success';
    deleteUserSuccess(message): Action {
        return {
            type: UserAdministrationActions.DELETE_USER_SUCCESS,
            payload: message
        };
    }
    static DELETE_USER_FAILURE = 'UserBase Delete user Failure';
    deleteUserFailure(error): Action {
        return {
            type: UserAdministrationActions.DELETE_USER_FAILURE,
            payload: {error: error}
        };
    }


}