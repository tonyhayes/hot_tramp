import { QuestionControlService } from './question-control.service';
import { DropdownQuestion } from './components/question-dropdown';
import { TextboxQuestion } from './components/question-textbox';
import { QuestionBase } from './model/question-base';
import { Validators } from '@angular/forms';

describe('QuestionControlService', () => {

  	let service: QuestionControlService;
  	let QuestionState = [];
  	beforeEach(() => {
		service = new QuestionControlService();
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
 //specs
	it('should create a QuestionControlService', () => {
		const qcs = new QuestionControlService();
 		expect(qcs).toBeDefined();
	});
	it('should create an formatted QuestionControlService', () => {
		const qcs = new QuestionControlService();
	  	let qb:QuestionBase<any>[] = [
	  	new DropdownQuestion({
	  		key: 'brave',
	  		label: 'Bravery Rating',
	  		options: [
	  		{key: 'solid',  value: 'Solid'},
	  		{key: 'great',  value: 'Great'},
	  		{key: 'good',   value: 'Good'},
	  		{key: 'unproven', value: 'Unproven'}
	  		],
	  		order: 3
	  	}),
	  	new TextboxQuestion({
	  		key: 'firstName',
	  		label: 'First name',
	  		value: 'tony',
	  		validators: [Validators.required],
	  		order: 1
	  	}),
	  	new TextboxQuestion({
	  		key: 'emailAddress',
	  		label: 'Email',
	  		type: 'email',
	  		order: 2
	  	})
	  	];
	  	
	  	const fg = qcs.toFormGroup(qb).controls;
 		expect(fg['brave']).toBeDefined();
 		expect(fg['firstName']).toBeDefined();
 		expect(fg['emailAddress']).toBeDefined();
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
  	it('createDynamicFormComponent of type DateQuestion', () => {
  		QuestionState[0].controlType = 'date'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('date');
  	});
  	it('createDynamicFormComponent of type DropdownQuestion', () => {
  		QuestionState[0].controlType = 'dropdown'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('dropdown');
  	});
  	it('createDynamicFormComponent of type DropdownKeyboardQuestion', () => {
  		QuestionState[0].controlType = 'dropdown-keyboard'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('dropdown-keyboard');
  	});
    	it('createDynamicFormComponent of type input', () => {
  		QuestionState[0].controlType = 'input'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('input');
  	});
  	it('createDynamicFormComponent of type NotesQuestion', () => {
  		QuestionState[0].controlType = 'notes'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('notes');
  	});
  	it('createDynamicFormComponent of type PhotoQuestion', () => {
  		QuestionState[0].controlType = 'photo'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('photo');
  	});
  	it('createDynamicFormComponent of type PhotosQuestion', () => {
  		QuestionState[0].controlType = 'photos'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('photos');
  	});
  	it('createDynamicFormComponent of type RadioQuestion', () => {
  		QuestionState[0].controlType = 'radio'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('radio');
  	});
  	it('createDynamicFormComponent of type SigantureQuestion', () => {
  		QuestionState[0].controlType = 'signature'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('signature');
  	});
  	it('createDynamicFormComponent of type TagSelectQuestion', () => {
  		QuestionState[0].controlType = 'tag'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('tag');
  	});
  	it('createDynamicFormComponent of type TextareaQuestion', () => {
  		QuestionState[0].controlType = 'textarea'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('textarea');
  	});
  	it('createDynamicFormComponent of type TextboxQuestion', () => {
  		QuestionState[0].controlType = 'textbox'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('textbox');
  	});
  	it('createDynamicFormComponent of type TextlineQuestion', () => {
  		QuestionState[0].controlType = 'textline'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('textline');
  	});
  	it('createDynamicFormComponent of type TimeQuestion', () => {
  		QuestionState[0].controlType = 'time'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('time');
  	});
  	it('createDynamicFormComponent of type WeatherUndergroundQuestion', () => {
  		QuestionState[0].controlType = 'weather-underground'
		const result = service.createDynamicFormComponent(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].controlType).toBe('weather-underground');
  	});

}) 

