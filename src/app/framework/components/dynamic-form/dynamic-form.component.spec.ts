// Load the implementations that should be tested
import { DynamicFormComponent } from './dynamic-form.component';
import { QuestionControlService }    from './question-control.service';
import { DropdownQuestion } from './components/question-dropdown';
import { TextboxQuestion } from './components/question-textbox';
import { QuestionBase } from './model/question-base';

describe('DynamicFormComponent', () => {
	// provide our implementations or mocks to the dependency injector
	const qcs = new QuestionControlService();
	const dfc = new DynamicFormComponent(qcs);
	const questions = [
			{
				key: 'name',
				label: 'NAME',
				type: 'text',
        		controlType: 'input',							
				groupColumns: "2-Column",
				order: 1,
				validators: [],
				required: true
			},
			{
				key: 'description',
				label: 'DESCRIPTION',
				type: 'text',
        		controlType: 'input',							
				order: 2,
				validators: [],
				required: true
			},
			{
				key: 'icon',
				label: 'ICON',
				type: 'text',
        		controlType: 'input',							
				order: 3,
				validators: [],
				required: true
			},
			{
				key: 'listStyle',
				label: 'ALLOW_MULTIPLE_FORM_ENTRIES',
				type: 'checkbox',
        		controlType: 'checkbox',							
				order: 4,
			},					

		];


	let qb = [
	{
		key: 'brave',
		label: 'Bravery Rating',
		controlType: 'bs-dropdown',
		options: [
		{key: 'solid',  value: 'Solid'},
		{key: 'great',  value: 'Great'},
		{key: 'good',   value: 'Good'},
		{key: 'unproven', value: 'Unproven'}
		],
		order: 3
	},
	{
		key: 'firstName',
		label: 'First name',
		controlType: 'input',
		value: 'tony',
		required: true,
		order: 1
	},
	{
		key: 'emailAddress',
		label: 'Email',
		controlType: 'input',
		type: 'email',
		order: 2
	}
	];

	it('should define DynamicFormComponent', () => {
		expect(DynamicFormComponent).toBeDefined();
	});
	it('should create DynamicFormComponent', () => {
		expect(dfc).toBeDefined();
	});
	it('should create DynamicFormComponent on ngOnInit', () => {
		dfc.questionList = questions;
		dfc.ngOnInit();
		expect(dfc.formList).toBeDefined();
	});
	it('should create DynamicFormComponent on onSubmit', () => {
		dfc.questionList = questions;
		dfc.ngOnInit();
		expect(dfc.formList).toBeDefined();
		dfc.onSubmit();
		expect(dfc.formList[0].value).toEqual({"name":"","description":"","icon":"", "listStyle": ""});
	});
	it('should run getQuestionClass - null', () => {
		dfc.questionList = questions;
		expect(dfc.getQuestionClass(null, null)).toEqual(undefined);
	});
	it('should run getQuestionClass -  groupClass null, columnClass - bad value', () => {
		dfc.questionList = questions;
		expect(dfc.getQuestionClass(null, 'tony')).toEqual(undefined);
	});
	it('should run getQuestionClass -  groupClass null, columnClass - 1-Column', () => {
		dfc.questionList = questions;
		expect(dfc.getQuestionClass(null, '1-Column')).toEqual('form-group col-md-12');
	});
	it('should run getQuestionClass -  groupClass null, columnClass - 2-Column', () => {
		dfc.questionList = questions;
		expect(dfc.getQuestionClass(null, '2-Column')).toEqual('form-group col-md-6');
	});
	it('should run getQuestionClass -  groupClass null, columnClass - 3-Column', () => {
		dfc.questionList = questions;
		expect(dfc.getQuestionClass(null, '3-Column')).toEqual('form-group col-md-4');
	});
	it('should run getQuestionClass -  groupClass bad value, columnClass - null', () => {
		dfc.questionList = questions;
		expect(dfc.getQuestionClass('tony', null)).toEqual(undefined);
	});
	it('should run getQuestionClass -  groupClass 1-Column, columnClass - null', () => {
		dfc.questionList = questions;
		expect(dfc.getQuestionClass('1-Column', null)).toEqual('form-group col-md-12');
	});
	it('should run getQuestionClass -  groupClass 2-Column, columnClass - null', () => {
		dfc.questionList = questions;
		expect(dfc.getQuestionClass('2-Column', null)).toEqual('form-group col-md-6');
	});
	it('should run getQuestionClass -  groupClass 2-Column, columnClass - null', () => {
		dfc.questionList = questions;
		expect(dfc.getQuestionClass('3-Column', null)).toEqual('form-group col-md-4');
	});
	it('should run getQuestionClass -  groupClass bad value, columnClass - bad', () => {
		dfc.questionList = questions;
		expect(dfc.getQuestionClass('tony', 'tony')).toEqual(undefined);
	});
	it('should run getQuestionClass -  groupClass 1-Column, columnClass - 3-Column', () => {
		dfc.questionList = questions;
		expect(dfc.getQuestionClass('1-Column', '3-Column')).toEqual('form-group col-md-4');
	});
	it('should run onCancel', () => {
		dfc.questionList = questions;
		dfc.onCancel();
		expect(dfc.formList).toBeDefined();
	});
	it('should run onSubmit', () => {
		dfc.questionList = questions;
		dfc.onSubmit();
		expect(dfc.formList).toBeDefined();
	});
	it('should run onSubmit -listStyle', () => {
		dfc.questionList = questions;
		dfc.listStyle = true;
		dfc.formList = [];
		dfc.onSubmit();
		expect(dfc.formList).toBeDefined();
	});
	it('should run areFormsValid - true', () => {
		dfc.formList = [{valid: true},{valid: true},{valid: true},];
		expect(dfc.areFormsValid()).toEqual(true);
	});
	it('should run areFormsValid - true', () => {
		dfc.formList = [{valid: true},{valid: false},{valid: true},];
		expect(dfc.areFormsValid()).toEqual(false);
	});
	it('should run onDelete', () => {
		dfc.formList = [{valid: true},{valid: false},{valid: true},];
		dfc.onDelete(null, 1)
		expect(dfc.formList.length).toEqual(2);
		expect(dfc.areFormsValid()).toEqual(true);
	});
	it('should run onAdd', () => {
		dfc.questionList = questions;
		dfc.onAdd()
		expect(dfc.formList.length).toEqual(3);
	});


});