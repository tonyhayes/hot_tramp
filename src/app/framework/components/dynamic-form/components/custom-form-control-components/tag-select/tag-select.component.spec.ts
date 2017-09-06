import { TagSelectComponent } from './tag-select.component';
import { TagSelectQuestion } from '../../question-tag-select';

describe('TagSelectComponent', () => {
	const propagateChange:any = () => {
		return 'value'
	};
	const form = {
		patchValue: () => {
			return 'value'
		}
	};
  	const tag = new TagSelectQuestion({
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
	it('should be a listSelectValue of Select', () => {
		const component = new TagSelectComponent();
		component.form = form;
		expect(component.listSelectValue).toEqual('Select');
	});
	it('should return Select for writeValue()', () => {
		const component = new TagSelectComponent();
		component.form = form;
		component.writeValue(null)
		expect(component.listSelectValue).toEqual('Select');
	});
	it('should return 10 for writeValue(10)', () => {
		const component = new TagSelectComponent();
		component.form = form;
		component.writeValue('10')
		expect(component.listSelectValue).toEqual('10');
	});
	it('should return items for ngOnInit', () => {
		const component = new TagSelectComponent();
		component.form = form;
		component.question = tag;
		component.ngOnInit();
		expect(component.items[0].id).toEqual("solid");
	});
	it('should propagateChange for registerOnChange', () => {
		const component = new TagSelectComponent();
		component.form = form;
		component.question = tag;
		component.registerOnChange(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
	});
	it('should propagateChange for registerOnTouched', () => {
		const component = new TagSelectComponent();
		component.form = form;
		component.question = tag;
		component.registerOnTouched(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
	});
	it('should run  selected', () => {
		const component = new TagSelectComponent();
		component.form = form;
		component.question = tag;
		component.registerOnTouched(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
		component.selected(component.propagateChange());
	});
	it('should run  removed', () => {
		const component = new TagSelectComponent();
		component.form = form;
		component.question = tag;
		component.registerOnTouched(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
		component.removed(component.propagateChange());
	});
	it('should run  refreshValue', () => {
		const component = new TagSelectComponent();
		component.form = form;
		component.question = tag;
		component.registerOnTouched(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
		component.refreshValue([component.propagateChange()]);
	});

}) 

