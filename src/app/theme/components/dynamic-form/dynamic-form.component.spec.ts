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
		required: true,
		order: 1
	}),
	new TextboxQuestion({
		key: 'emailAddress',
		label: 'Email',
		type: 'email',
		order: 2
	})
	];

	it('should define DynamicFormComponent', () => {
		expect(DynamicFormComponent).toBeDefined();
	});
	it('should create DynamicFormComponent', () => {
		expect(dfc).toBeDefined();
	});
	it('should create DynamicFormComponent on ngOnInit', () => {
		dfc.questions = qb;
		dfc.ngOnInit();
		expect(dfc.form).toBeDefined();
	});
	it('should create DynamicFormComponent on onSubmit', () => {
		dfc.questions = qb;
		dfc.ngOnInit();
		expect(dfc.form).toBeDefined();
		dfc.onSubmit();
		expect(dfc.payLoad).toEqual('{"brave":"","firstName":"tony","emailAddress":""}');
	});


});