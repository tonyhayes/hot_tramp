import { DatalistSelectComponent } from './datalist-select.component';
import { DatalistQuestion } from '../../question-datalist';

describe('DatalistSelectComponent', () => {
	const propagateChange:any = () => {
		return 'value'
	};
	const form = {
		patchValue: () => {
			return 'value'
		}
	};
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

	//specs
	it('should be a datalistSelectValue of Select', () => {
		const component = new DatalistSelectComponent();
		expect(component.datalistSelectValue).toEqual('Select');
	});
	it('should return Select for writeValue()', () => {
		const component = new DatalistSelectComponent();
		component.writeValue(null)
		expect(component.datalistSelectValue).toEqual('Select');
	});
	it('should return 10 for writeValue(10)', () => {
		const component = new DatalistSelectComponent();
		component.writeValue('10')
		expect(component.datalistSelectValue).toEqual('10');
	});
	it('should propagateChange for registerOnChange', () => {
		const component = new DatalistSelectComponent();
		component.form = form;
		component.question = dlq;
		component.registerOnChange(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
	});
	it('should propagateChange for registerOnTouched', () => {
		const component = new DatalistSelectComponent();
		component.form = form;
		component.question = dlq;
		component.registerOnTouched(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
	});
	it('should run  selectValue', () => {
		const component = new DatalistSelectComponent();
		component.form = form;
		component.question = dlq;
		component.registerOnTouched(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
		component.selectValue();
		expect(component.datalistSelectValue).toEqual('Select');
	});
	it('should run  selectValue2', () => {
		const component = new DatalistSelectComponent();
		component.form = form;
		component.question = dlq;
		component.registerOnTouched(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
		component.selectValue(component.propagateChange(), component.propagateChange());
		expect(component.datalistSelectValue).toEqual('Select');
	});


}) 

