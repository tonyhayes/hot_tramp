import { GridQuestion } from './question-grid';

describe('GridQuestion', () => {
  
  //specs
  	it('should be a controlType of grid', () => {
  		const ddq = new GridQuestion();
    	expect(ddq.controlType).toEqual('grid');
  	});
  	it('should return empty options array', () => {
  		const ddq = new GridQuestion();
    	expect(ddq.options.length).toEqual(0);
  	});
  	it('should be a formatted grid', () => {
	  	const ddq = new GridQuestion({
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
  	it('should be a formatted grid', () => {
	  	const ddq = new GridQuestion({
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
  	it('should be a formatted grid, with options', () => {
	  	const ddq = new GridQuestion({
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

