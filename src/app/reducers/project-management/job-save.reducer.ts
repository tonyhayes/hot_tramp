import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type SaveJobState = any[];

const initialState: any[] = [];

export const saveJobReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.SAVE_JOB_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.SAVE_JOB_FAILURE: {
            return action.payload;
        }
        // default: {
        //     return state;
        // }
    }
}