import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type LoadCategoryState = any[];

const initialState: any[] = [];

export const loadCategoryReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.LOAD_CATEGORY_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.LOAD_CATEGORY_FAILURE: {
            return action.payload;
        }
        // default: {
        //     return state;
        // }
    }
}