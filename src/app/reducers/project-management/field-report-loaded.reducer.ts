import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type LoadedFieldReportState = any[];

const initialState: any[] = [];

export const loadedFieldReportReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.GET_LOADED_FIELD_REPORT_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.GET_LOADED_FIELD_REPORT_FAILURE: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}