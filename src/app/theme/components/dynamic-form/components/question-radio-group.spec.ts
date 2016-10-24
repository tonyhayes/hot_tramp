import { RadioQuestion } from './question-radio-group';

describe('RadioQuestion', () => {
  
  //specs
  	it('should be a controlType of radio', () => {
  		const ddq = new RadioQuestion();
    	expect(ddq.controlType).toEqual('radio');
  	});
  	it('should return empty options array', () => {
  		const ddq = new RadioQuestion();
    	expect(ddq.options.length).toEqual(0);
  	});
  	it('should be a formatted radio', () => {
	  	const ddq = new RadioQuestion({
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
  	it('should be a formatted radio, with options', () => {
	  	const ddq = new RadioQuestion({
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

