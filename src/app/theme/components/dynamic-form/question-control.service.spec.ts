import { QuestionControlService } from './question-control.service';
import { DropdownQuestion } from './components/question-dropdown';
import { TextboxQuestion } from './components/question-textbox';
import { QuestionBase } from './model/question-base';

describe('QuestionControlService', () => {

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
	  	
	  	const fg = qcs.toFormGroup(qb).controls;
 		expect(fg['brave']).toBeDefined();
 		expect(fg['firstName']).toBeDefined();
 		expect(fg['emailAddress']).toBeDefined();
	});

}) 

