import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { AppState } from '../reducers';
import { QuestionActions } from '../actions';
import { QuestionService } from '../services';

@Injectable()
export class QuestionEffects {
    constructor (
        private update$: Actions,
        private actions: QuestionActions,
        private svc: QuestionService
    ) {}

    @Effect() loadFormQuestions$ = this.update$
        .ofType(QuestionActions.LOAD_FORM_QUESTIONS)
        .switchMap(() => this.svc.getFormQuestions())
        .map(questionComponents => this.actions.loadFormQuestionsSuccess(questionComponents));

    @Effect() loadQuestions$ = this.update$
        .ofType(QuestionActions.LOAD_QUESTIONS)
        .switchMap(() => this.svc.getQuestions())
        .map(questions => this.actions.loadQuestionsSuccess(questions));


    @Effect() saveQuestions$ = this.update$
        .ofType(QuestionActions.SAVE_QUESTIONS)
        .map(action => action.payload)
        .switchMap(questions => this.svc.saveQuestions(questions))
        .map(questions => this.actions.saveQuestionsSuccess(questions));


}