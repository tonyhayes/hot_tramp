import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type SendFieldReportState = any[];

const initialState: any[] = [];

export const sendFieldReportReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.SEND_FIELD_REPORT_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.SEND_FIELD_REPORT_FAILURE: {
            return action.payload;
        }
        // default: {
        //     return state;
        // }
    }
}