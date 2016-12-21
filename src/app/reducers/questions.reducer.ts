import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { QuestionBase } from '../theme/components/dynamic-form';
import { QuestionActions } from '../actions';

export type QuestionState = QuestionBase<any>[];

const initialState: QuestionBase<any>[] = [];

export default function (state = initialState, action: Action): QuestionBase<any>[] {
    switch (action.type) {
        case QuestionActions.LOAD_QUESTIONS_SUCCESS: {
            return action.payload;
        }
        case QuestionActions.SAVE_QUESTIONS_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}