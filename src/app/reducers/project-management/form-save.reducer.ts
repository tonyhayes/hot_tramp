import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ProjectManagementActions } from '../../actions';

export type SaveFormState = any[];

const initialState: any[] = [];

export const saveFormReducer = function (state = initialState, action: Action): any[] {
    switch (action.type) {
        case ProjectManagementActions.SAVE_FORM_SUCCESS: {
            return action.payload;
        }
        case ProjectManagementActions.SAVE_FORM_FAILURE: {
            return action.payload;
        }
        // default: {
        //     return state;
        // }
    }
}