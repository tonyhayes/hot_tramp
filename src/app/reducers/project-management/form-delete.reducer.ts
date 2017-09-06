import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type DeleteFormState = any[];

const initialState: any[] = [];

export const deleteFormReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.DELETE_FORM_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.DELETE_FORM_FAILURE: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}