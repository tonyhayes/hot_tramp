import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type LoadProjectState = any[];

const initialState: any[] = [];

export const loadProjectReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.LOAD_PROJECT_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.LOAD_PROJECT_FAILURE: {
            return action.payload;
        }
        // default: {
        //     return state;
        // }
    }
}