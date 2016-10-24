import { BsDropdownQuestion } from './question-bs-dropdown';

describe('BsDropdownQuestion', () => {
  
  //specs
  	it('should be a controlType of bs-dropdown', () => {
  		const ddq = new BsDropdownQuestion();
    	expect(ddq.controlType).toEqual('bs-dropdown');
  	});
  	it('should return empty options array', () => {
  		const ddq = new BsDropdownQuestion();
    	expect(ddq.options.length).toEqual(0);
  	});
  	it('should be a formatted dropdown', () => {
	  	const ddq = new BsDropdownQuestion({
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
	  	const ddq = new BsDropdownQuestion({
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

