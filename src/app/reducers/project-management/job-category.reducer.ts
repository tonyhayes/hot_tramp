import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type JobCategoryState = any[];

const initialState: any[] = [];

export const jobCategoryReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.LOAD_JOB_CATEGORY_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.LOAD_JOB_CATEGORY_FAILURE: {
            return action.payload;
        }
        // default: {
        //     return state;
        // }
    }
}