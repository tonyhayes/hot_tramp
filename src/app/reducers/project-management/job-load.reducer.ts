import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type LoadJobState = any[];

const initialState: any[] = [];

export const loadJobReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.LOAD_JOB_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.LOAD_JOB_FAILURE: {
            return action.payload;
        }
        // default: {
        //     return state;
        // }
    }
}