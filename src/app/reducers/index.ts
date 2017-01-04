import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import userAdministrationReducer, * as fromUserAdministration from './user-administration.reducer';
import questionsReducer, * as fromQuestions from './questions.reducer';
import questionsFormReducer, * as fromFormQuestions from './questions-form.reducer';

export interface AppState {
    userAdministration: fromUserAdministration.AdministrationUsersState;
    questions: fromQuestions.QuestionState;
    formQuestions: fromFormQuestions.QuestionState;
}
export default compose(combineReducers)({
    userAdministration: userAdministrationReducer,
    questions: questionsReducer,
    formQuestions: questionsFormReducer

});