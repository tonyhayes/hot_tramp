import { QuestionService } from './question.service';
import { QuestionActions } from '../actions';
import { QuestionBase } from '../framework/components/dynamic-form';
import { Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {} from 'jasmine'

describe('question service', () => {
  	let service: QuestionService;
  	let QuestionState = [];
  	let http 

  	beforeEach(() => {
		service = new QuestionService( http );
		QuestionState = [
				{
			  		key: '1',
			  		label: 'Test',
			  		value: 'whoooooo',
			  		required: false,
			  		readonly: false,
			  		placeholder: 'false',
			  		order: 1,
			  		controlType: 'cheese',
			  		className: 'false',
			  		group: 17,
			  		groupColumns: 'false',
			  		columns: [],
			  		data: [],
			  		hidden: false,

				}
			];
  	});


});