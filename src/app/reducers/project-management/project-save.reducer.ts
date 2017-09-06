import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type SaveProjectState = any[];

const initialState: any[] = [];

export const saveProjectReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.SAVE_PROJECT_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.SAVE_PROJECT_FAILURE: {
            return action.payload;
        }
        // default: {
        //     return state;
        // }
    }
}