import { DropdownKeyboardQuestion } from './question-dropdown-keyboard';
import {} from 'jasmine'

describe('DropdownKeyboardQuestion', () => {
  
  //specs
  	it('should be a controlType of bs-dropdown', () => {
  		const ddq = new DropdownKeyboardQuestion();
    	expect(ddq.controlType).toEqual('dropdown-keyboard');
  	});
  	it('should return empty options array', () => {
  		const ddq = new DropdownKeyboardQuestion();
    	expect(ddq.options.length).toEqual(0);
  	});
  	it('should be a formatted dropdown', () => {
	  	const ddq = new DropdownKeyboardQuestion({
	  		key: 'brave',
	  		label: 'Bravery Rating',
	  		options: [
	  		{key: 'solid',  value: 'Solid'},
	  		{key: 'great',  value: 'Great'},
	  		{key: 'good',   value: 'Good'},
	  		{key: 'unproven', value: 'Unproven'}
	  		],
	  		order: 3
	  	});
    	expect(ddq.key).toEqual('brave');
    	expect(ddq.label).toEqual('Bravery Rating');
  	});
  	it('should be a formatted dropdown, with options', () => {
	  	const ddq = new DropdownKeyboardQuestion({
	  		key: 'brave',
	  		label: 'Bravery Rating',
	  		options: [
	  		{key: 'solid',  value: 'Solid'},
	  		{key: 'great',  value: 'Great'},
	  		{key: 'good',   value: 'Good'},
	  		{key: 'unproven', value: 'Unproven'}
	  		],
	  		order: 3
	  	});
    	expect(ddq.options.length).toEqual(4);
    	expect(ddq.options[0].key).toEqual('solid');
    	expect(ddq.options[0].value).toEqual('Solid');
  	});
}) 

