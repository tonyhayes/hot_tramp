import { TimepickerComponent } from './timepicker.component';

describe('TimepickerComponent', () => {
	const propagateChange:any = () => {
		return 'value'
	};
  	const tag = new TimepickerComponent();
	const form = {
		patchValue: () => {
			return 'value'
		}
	};
  
	//specs
	it('should set and get a value', () => {
		const component = new TimepickerComponent();
		component.question = {};
		expect(component._value).toEqual(null);
	});

	it('should ngOnInit', () => {
		const component = new TimepickerComponent();
		component.form = form;
		component.value = '';
		component.question = {html: '', key: ''};
		component.ngOnInit();
		expect(component.value).toEqual('');
	});
	it('should registerOnTouched', () => {
		const component = new TimepickerComponent();
		component.question = {};
		component.value = '';
		component.registerOnTouched();
		expect(component.value).toEqual('');
	});
	it('should registerOnChange', () => {
		const component = new TimepickerComponent();
		component.question = {};
		component.value = '';
		component.registerOnChange(propagateChange);
		expect(component.value).toEqual('');
	});
	it('should writeValue - null', () => {
		const component = new TimepickerComponent();
		component.question = {html: ''};
		component.value = '';
		component.writeValue();
		expect(component.value).toEqual('');
	});
	it('should writeValue', () => {
		const component = new TimepickerComponent();
		component.question = {};
		component.value = '';
		component.writeValue('tony');
		expect(component.value).toEqual('tony');
	});
	it('should saveValue', () => {
		const component = new TimepickerComponent();
		component.question = {};
		component.form = form;
		component.value = '';
		component.saveValue('tony');
		expect(component.value).toEqual('tony');
	});
	it('should saveValue - null', () => {
		const component = new TimepickerComponent();
		component.question = {};
		component.form = form;
		component.value = '';
		component.saveValue();
		expect(component.value).toEqual('');
	});

}) 

