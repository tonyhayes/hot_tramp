import { QuestionBase } from './question-base';
import { DropdownQuestion } from '../components/question-dropdown';
import { TextboxQuestion } from '../components/question-textbox';

describe('QuestionBase', () => {

 //specs
	it('should create a QuestionBase', () => {
		const qb = new QuestionBase();
 		expect(qb).toBeDefined();
	});
	it('should create an empty QuestionBase', () => {
		const qb = new QuestionBase();
 		expect(qb.value).toEqual(undefined);
		expect(qb.key).toEqual('');
		expect(qb.label).toEqual('');
		expect(qb.order).toEqual(1);
		expect(qb.controlType).toEqual('');
	});
	it('should create an formatted QuestionBase', () => {
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
 		expect(qb[0].value).toEqual(undefined);
		expect(qb[0].key).toEqual('brave');
		expect(qb[0].label).toEqual('Bravery Rating');
		expect(qb[0].order).toEqual(3);
		expect(qb[0].controlType).toEqual('dropdown');
    	expect(qb[0].options.length).toEqual(4);
    	expect(qb[0].options[0].key).toEqual('solid');
    	expect(qb[0].options[0].value).toEqual('Solid');
	});

}) 

