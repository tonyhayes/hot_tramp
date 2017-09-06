import { questionsFormReducer } from './questions-form.reducer';
import { QuestionActions } from '../../actions';
import { QuestionBase } from '../../framework/components/dynamic-form';

describe('questions-form Reducer', () => {
  	let actions: QuestionActions;
  	let QuestionState: QuestionBase<any>[] = [];

  	beforeEach(() => {
		actions = new QuestionActions();
		QuestionState = [{
			  		key: '1',
			  		label: 'Test',
			  		value: 'whoooooo',
			  		required: false,
			  		readonly: false,
			  		placeholder: 'false',
			  		order: 1,
			  		controlType: 'false',
			  		className: 'false',
			  		group: 1,
			  		groupColumns: 'false',
			  		columns: [],
			  		data: [],
			  		hidden: false,

				}];
  	});

  	it('uses an initial state when none is given', () => {
		let result = questionsFormReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
  	});
   	it('return payload when LOAD_FORM_QUESTIONS_SUCCESS is given', () => {
		let result = questionsFormReducer(undefined, actions.loadFormQuestionsSuccess(QuestionState));
		expect(result[0].label).toBe('Test');
  	});

});