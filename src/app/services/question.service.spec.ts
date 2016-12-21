import { QuestionService } from './question.service';
import { QuestionActions } from '../actions';
import { QuestionBase } from '../theme/components/dynamic-form';
import { Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('question service', () => {
  	let service: QuestionService;
  	let QuestionState: QuestionBase<any>[] = [];
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

  	it('createDynamicFormComponent of type input', () => {
  		QuestionState[0].controlType = 'input'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('input');
  	});
  	it('createDynamicFormComponent of type DateQuestion', () => {
  		QuestionState[0].controlType = 'date'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('date');
  	});
  	it('createDynamicFormComponent of type TextareaQuestion', () => {
  		QuestionState[0].controlType = 'textarea'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('textarea');
  	});
  	it('createDynamicFormComponent of type TagSelectQuestion', () => {
  		QuestionState[0].controlType = 'tag'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('tag');
  	});
  	it('createDynamicFormComponent of type BsDropdownQuestion', () => {
  		QuestionState[0].controlType = 'bs-dropdown'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('bs-dropdown');
  	});
  	it('createDynamicFormComponent of type CheckboxQuestion', () => {
  		QuestionState[0].controlType = 'checkbox'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('checkbox');
  	});
  	it('createDynamicFormComponent of type DatalistQuestion', () => {
  		QuestionState[0].controlType = 'datalist'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('datalist');
  	});
  	it('createDynamicFormComponent of type GridSmartQuestion', () => {
  		QuestionState[0].controlType = 'smart-grid'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('smart-grid');
  	});
  	it('createDynamicFormComponent of type DocumentsGridQuestion', () => {
  		QuestionState[0].controlType = 'documents-grid'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('documents-grid');
  	});
  	it('groupDynamicFormComponents of type DocumentsGridQuestion', () => {
  		QuestionState[0].controlType = 'documents-grid'
		const result = service.groupDynamicFormComponents(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].group).toBe(1);
  	});
  	it('createDynamicForm', () => {
  		QuestionState[0].controlType = 'documents-grid'
		const result = service.groupDynamicFormComponents(QuestionState);
		const result2 = service.createDynamicForm(result);
		expect(result2.length).toBe(1);
		expect(result2[0].group).toBe(1);
  	});

});