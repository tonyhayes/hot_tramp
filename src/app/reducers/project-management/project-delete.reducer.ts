import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type DeleteProjectState = any[];

const initialState: any[] = [];

export const deleteProjectReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.DELETE_PROJECT_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.DELETE_PROJECT_FAILURE: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}