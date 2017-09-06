import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type LoadFieldReportState = any[];

const initialState: any[] = [];

export const loadFieldReportReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.LOAD_FIELD_REPORT_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.LOAD_FIELD_REPORT_FAILURE: {
            return action.payload;
        }
        // default: {
        //     return state;
        // }
    }
}