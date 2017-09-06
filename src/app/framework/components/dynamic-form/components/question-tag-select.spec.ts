import { TagSelectQuestion } from './question-tag-select';
import {} from 'jasmine'

describe('TagSelectQuestion', () => {
  
  //specs
  	it('should be a controlType of tag', () => {
  		const ddq = new TagSelectQuestion();
    	expect(ddq.controlType).toEqual('tag');
  	});
  	it('should return empty options array', () => {
  		const ddq = new TagSelectQuestion();
    	expect(ddq.options.length).toEqual(0);
  	});
  	it('should be a formatted tag', () => {
	  	const ddq = new TagSelectQuestion({
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
  	it('should be a formatted tag select', () => {
	  	const ddq = new TagSelectQuestion({
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
  	it('should be a formatted tag, with options', () => {
	  	const ddq = new TagSelectQuestion({
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

