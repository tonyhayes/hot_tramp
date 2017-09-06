import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { UserAdministrationActions } from '../actions';
import { UserAdministrationService } from '../services';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
@Injectable()
export class UserAdministrationEffects {
    constructor (
        private update$: Actions,
        private actions: UserAdministrationActions,
        private svc: UserAdministrationService
    ) {}


    @Effect() loadUsers$ = this.update$
        .ofType(UserAdministrationActions.LOAD_USERS)
        .switchMap(() => this.svc.getUsers())
        .map(users => this.actions.loadUsersSuccess(users))
        .catch(error => error)

    @Effect() loadUser$ = this.update$
        .ofType(UserAdministrationActions.LOAD_USER)
        .map(() => this.svc.getUser())
        .map(user => this.actions.loadUserSuccess(user));

    @Effect() loadLicenses$ = this.update$
        .ofType(UserAdministrationActions.LOAD_LICENSES)
        .switchMap(() => this.svc.getLicenses())
        .map(licenses => this.actions.loadLicensesSuccess(licenses))
        .catch(error => error)


    @Effect() saveUsers$ = this.update$
        .ofType(UserAdministrationActions.SAVE_USERS)
        .map(action => action.payload)
        .switchMap((users) => this.svc.saveUsers(users))
        .map(users => this.actions.saveUsersSuccess(users));

    @Effect() addUserLicense$ = this.update$
        .ofType(UserAdministrationActions.ADD_USER_LICENSE)
        .map(action => action.payload)
        .switchMap((license) => this.svc.addUserLicense(license))
        .map((license) => this.actions.addUserLicenseSuccess(license))
        .catch(error => Observable.of(this.actions.addUserLicenseFailure(error)))

    @Effect() removeUserLicense$ = this.update$
        .ofType(UserAdministrationActions.REMOVE_USER_LICENSE)
        .map(action => action.payload)
        .switchMap((license) => this.svc.removeUserLicense(license))
        .map((license) => this.actions.removeUserLicenseSuccess(license))
        .catch(error => Observable.of(this.actions.removeUserLicenseFailure(error)))

    @Effect() saveUser$ = this.update$
        .ofType(UserAdministrationActions.SAVE_USER)
        .map(action => action.payload)
        .map((user) => this.svc.saveUser(user))
        .map(user => this.actions.saveUserSuccess(user));

    @Effect() addUser$ = this.update$
        .ofType(UserAdministrationActions.ADD_USER)
        .map(action => action.payload)
        .switchMap((user:any):any => this.svc.addUser(user))
        .map((user) => this.actions.addUserSuccess(user))
        .catch(error => Observable.of(error))
        
    @Effect() deleteUser$ = this.update$
        .ofType(UserAdministrationActions.DELETE_USER)
        .map(action => action.payload)
        .switchMap((user:any):any => this.svc.deleteUser(user))
        .map((message) => this.actions.deleteUserSuccess(message))
        .catch(error => Observable.of(this.actions.deleteUserFailure(error)))


}