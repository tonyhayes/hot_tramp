import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type DeleteJobState = any[];

const initialState: any[] = [];

export const deleteJobReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.DELETE_JOB_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.DELETE_JOB_FAILURE: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}