import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { LicenseBase } from '../../pages/user-administration';
import { UserAdministrationActions } from '../../actions';

export type AdministrationLicenseState = LicenseBase[];

const initialState: LicenseBase[] = [];

export const licenseAdministrationReducer = function (state = initialState, action: Action): LicenseBase[] {
    switch (action.type) {
        case UserAdministrationActions.LOAD_LICENSES_SUCCESS: {
            return action.payload;
        }
        case UserAdministrationActions.LOAD_LICENSES_FAILURE: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}