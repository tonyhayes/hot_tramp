import { QuestionActions } from './question.actions';
import { QuestionBase } from '../framework/components/dynamic-form';
describe('QuestionActions', () => {
	let actions: QuestionActions;
	const questions = new QuestionBase();

	beforeEach(() => {
		actions = new QuestionActions();
	});

	it('returns LOAD_QUESTIONS', () => {
		expect(actions.loadQuestions(null).type).toEqual('[QuestionBase] Load questions');
	});
	it('returns LOAD_QUESTIONS_SUCCESS', () => {
		expect(actions.loadQuestionsSuccess(questions).type).toEqual('[QuestionBase] Load questions Success');
	});
	it('returns LOAD_SAVED_QUESTIONS', () => {
		expect(actions.loadSavedQuestions(null).type).toEqual('[QuestionBase] Load saved questions');
	});
	it('returns LOAD_SAVED_QUESTIONS_SUCCESS', () => {
		expect(actions.loadSavedQuestionsSuccess(questions).type).toEqual('[QuestionBase] Load saved questions Success');
	});
	it('returns LOAD_FORM_QUESTIONS', () => {
		expect(actions.loadFormQuestions(null).type).toEqual('[QuestionBase] Load form questions');
	});
	it('returns LOAD_FORM_QUESTIONS_SUCCESS', () => {
		expect(actions.loadFormQuestionsSuccess(questions).type).toEqual('[QuestionBase] Load form questions Success');
	});
	it('returns SAVE_QUESTIONS', () => {
		expect(actions.saveQuestions([null, 'tony']).type).toEqual('[QuestionBase] Save questions');
		expect(actions.saveQuestions([null, 'tony']).payload[1]).toEqual('tony');
	});
	it('returns SAVE_QUESTIONS_SUCCESS', () => {
		expect(actions.saveQuestionsSuccess('tony').type).toEqual('[QuestionBase] Save questions Success');
		expect(actions.saveQuestionsSuccess('tony').payload).toEqual('tony');
	});
});