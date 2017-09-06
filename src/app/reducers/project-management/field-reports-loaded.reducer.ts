import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type LoadedFieldReportsState = any[];

const initialState: any[] = [];

export const loadedFieldReportsReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.GET_LOADED_FIELD_REPORTS_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.GET_LOADED_FIELD_REPORTS_FAILURE: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}