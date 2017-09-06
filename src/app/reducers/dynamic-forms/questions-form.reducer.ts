import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { QuestionBase } from '../../framework/components/dynamic-form';
import { QuestionActions } from '../../actions';

export type QuestionFormState = QuestionBase<any>[];

const initialState: QuestionBase<any>[] = [];

export const questionsFormReducer = function (state = initialState, action: Action): QuestionBase<any>[] {
    switch (action.type) {
        case QuestionActions.LOAD_FORM_QUESTIONS_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}