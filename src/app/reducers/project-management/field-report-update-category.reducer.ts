import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type UpdateFieldReportCategoryState = any[];

const initialState: any[] = [];

export const updateFieldReportCategoryReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.UPDATE_FIELD_REPORT_CATEGORY_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.UPDATE_FIELD_REPORT_CATEGORY_FAILURE: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}