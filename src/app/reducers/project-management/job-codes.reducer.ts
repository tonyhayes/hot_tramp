import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type JobCodeState = any[];

const initialState: any[] = [];

export const jobCodesReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.LOAD_JOB_CODES_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.LOAD_JOB_CODES_FAILURE: {
            return action.payload;
        }
        // default: {
        //     return state;
        // }
    }
}