import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type JobCategoriesState = any[];

const initialState: any[] = [];

export const jobCategoriesReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.LOAD_JOB_CATEGORIES_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.LOAD_JOB_CATEGORIES_FAILURE: {
            return action.payload;
        }
        // default: {
        //     return state;
        // }
    }
}