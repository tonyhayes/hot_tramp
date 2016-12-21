import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import questionsReducer, * as fromQuestions from './questions.reducer';
import questionsFormReducer, * as fromFormQuestions from './questions-form.reducer';

export interface AppState {
    questions: fromQuestions.QuestionState;
    formQuestions: fromFormQuestions.QuestionState;
}
export default compose(combineReducers)({
    questions: questionsReducer,
    formQuestions: questionsFormReducer

});