import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type SaveCategoryState = any[];

const initialState: any[] = [];

export const saveCategoryReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.SAVE_CATEGORY_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.SAVE_CATEGORY_FAILURE: {
            return action.payload;
        }
        // default: {
        //     return state;
        // }
    }
}