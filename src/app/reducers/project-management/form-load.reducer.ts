import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type LoadFormState = any[];

const initialState: any[] = [];

export const loadFormReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.LOAD_FORM_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.LOAD_FORM_FAILURE: {
            return action.payload;
        }
        // default: {
        //     return state;
        // }
    }
}