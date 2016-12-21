import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class QuestionActions {
    static LOAD_QUESTIONS = '[QuestionBase] Load questions';
    loadQuestions(): Action {
        return {
            type: QuestionActions.LOAD_QUESTIONS
        };
    }

    static LOAD_QUESTIONS_SUCCESS = '[QuestionBase] Load questions Success';
    loadQuestionsSuccess(questions): Action {
        return {
            type: QuestionActions.LOAD_QUESTIONS_SUCCESS,
            payload: questions
        };
    }
    static LOAD_SAVED_QUESTIONS = '[QuestionBase] Load saved questions';
    loadSavedQuestions(): Action {
        return {
            type: QuestionActions.LOAD_SAVED_QUESTIONS
        };
    }

    static LOAD_SAVED_QUESTIONS_SUCCESS = '[QuestionBase] Load saved questions Success';
    loadSavedQuestionsSuccess(questions): Action {
        return {
            type: QuestionActions.LOAD_SAVED_QUESTIONS_SUCCESS,
            payload: questions
        };
    }
    static LOAD_FORM_QUESTIONS = '[QuestionBase] Load form questions';
    loadFormQuestions(): Action {
        return {
            type: QuestionActions.LOAD_FORM_QUESTIONS
        };
    }

    static LOAD_FORM_QUESTIONS_SUCCESS = '[QuestionBase] Load form questions Success';
    loadFormQuestionsSuccess(questions): Action {
        return {
            type: QuestionActions.LOAD_FORM_QUESTIONS_SUCCESS,
            payload: questions
        };
    }


    static SAVE_QUESTIONS = '[QuestionBase] Save questions';
    saveQuestions(questions): Action {
        return {
            type: QuestionActions.SAVE_QUESTIONS,
            payload: questions
        };
    }

    static SAVE_QUESTIONS_SUCCESS = '[QuestionBase] Save questions Success';
    saveQuestionsSuccess(questions): Action {
        return {
            type: QuestionActions.SAVE_QUESTIONS_SUCCESS,
            payload: questions
        };
    }


}