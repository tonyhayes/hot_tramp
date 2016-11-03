import { DatalistQuestion } from './question-datalist';

describe('DatalistQuestion', () => {
  
  //specs
  	it('should be a controlType of datalist', () => {
  		const dlq = new DatalistQuestion();
    	expect(dlq.controlType).toEqual('datalist');
  	});
  	it('should return empty options array', () => {
  		const dlq = new DatalistQuestion();
    	expect(dlq.options.length).toEqual(0);
  	});
  	it('should be a formatted datalist', () => {
	  	const dlq = new DatalistQuestion({
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
    	expect(dlq.key).toEqual('brave');
    	expect(dlq.label).toEqual('Bravery Rating');
  	});
  	it('should be a formatted datalist, with options', () => {
	  	const dlq = new DatalistQuestion({
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
    	expect(dlq.options.length).toEqual(4);
    	expect(dlq.options[0].key).toEqual('solid');
    	expect(dlq.options[0].value).toEqual('Solid');
  	});
}) 

