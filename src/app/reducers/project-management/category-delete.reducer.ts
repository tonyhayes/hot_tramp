import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type DeleteCategoryState = any[];

const initialState: any[] = [];

export const deleteCategoryReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.DELETE_CATEGORY_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.DELETE_CATEGORY_FAILURE: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}