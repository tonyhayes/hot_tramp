import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { AppState } from '../reducers';
import { UserAdministrationActions } from '../actions';
import { UserAdministrationService } from '../services';

@Injectable()
export class UserAdministrationEffects {
    constructor (
        private update$: Actions,
        private actions: UserAdministrationActions,
        private svc: UserAdministrationService
    ) {}


    @Effect() loadUsers$ = this.update$
        .ofType(UserAdministrationActions.LOAD_USERS)
        .switchMap(endPoint => this.svc.getUsers(endPoint))
        .map(users => this.actions.loadUsersSuccess(users));


    @Effect() saveUsers$ = this.update$
        .ofType(UserAdministrationActions.SAVE_USERS)
        .map(action => action.payload)
        .switchMap((endPoint, users) => this.svc.saveUsers(endPoint, users))
        .map(users => this.actions.saveUsersSuccess(users));


}