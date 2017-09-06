import { DropdownSelectComponent } from './dropdown-select.component';
import { DropdownQuestion } from '../../question-dropdown';

describe('DropdownSelectComponent', () => {
  
	const propagateChange:any = () => {
		return 'value'
	};
	const form = {
		patchValue: () => {
			return 'value'
		}
	};
  	const ddq = new DropdownQuestion({
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
	it('should be a dropdownSelectValue of Select', () => {
		const component = new DropdownSelectComponent();
		component.form = form;
		expect(component.dropdownSelectValue).toEqual('');
	});
	it('should return Select for writeValue()', () => {
		const component = new DropdownSelectComponent();
		component.form = form;
		component.writeValue(null)
		expect(component.dropdownSelectValue).toEqual('');
	});
	it('should return 10 for writeValue(10)', () => {
		const component = new DropdownSelectComponent();
		component.form = form;
		component.writeValue('10')
		expect(component.dropdownSelectValue).toEqual('10');
	});
	it('should return value for ngOnInit', () => {
		const component = new DropdownSelectComponent();
		component.form = form;
		component.question = ddq;
		component.ngOnInit();
		expect(component.dropdownSelectValue).toEqual("");
	});
	it('should propagateChange for registerOnChange', () => {
		const component = new DropdownSelectComponent();
		component.form = form;
		component.question = ddq;
		component.registerOnChange(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
	});
	it('should propagateChange for registerOnTouched', () => {
		const component = new DropdownSelectComponent();
		component.form = form;
		component.question = ddq;
		component.registerOnTouched(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
	});
	// it('should run  ngOnChanges', () => {
	// 	const component = new DropdownSelectComponent();
	// 	component.form = form;
	// 	component.question = ddq;
	// 	component.registerOnTouched(propagateChange);
	// 	expect(component.propagateChange).toBeDefined();
	// 	expect(component.propagateChange()).toEqual('value');
	// 	component.ngOnChanges(component.propagateChange());
	// });
	it('should run  selectValue', () => {
		const component = new DropdownSelectComponent();
		component.form = form;
		component.question = ddq;
		component.registerOnTouched(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
		// component.selectValue(component.propagateChange());
		// expect(component.dropdownSelectValue).toEqual('value');
	});


}) 

