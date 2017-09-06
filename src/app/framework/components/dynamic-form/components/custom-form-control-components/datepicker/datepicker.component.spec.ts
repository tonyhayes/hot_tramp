import { DatepickerComponent } from './datepicker.component';
import { TRANSLATIONS, TranslateService } from '../../../../../../translate';

describe('DatepickerComponent', () => {
	const propagateChange:any = () => {
		return 'value'
	};
	const translateService = new TranslateService(TRANSLATIONS);
  	const tag = new DatepickerComponent(translateService);
	const form = {
		patchValue: () => {
			return 'value'
		}
	};
  	
	//specs
	it('should set and get a value', () => {
		const component = new DatepickerComponent(translateService);
		component.question = {};
		expect(component._value).toEqual(null);
	});

	it('should ngOnInit', () => {
		const component = new DatepickerComponent(translateService);
		component.form = form;
		component.value = '';
		component.question = {html: '', key: ''};
		component.ngOnInit();
		expect(component.value).toEqual('');
	});
	it('should registerOnTouched', () => {
		const component = new DatepickerComponent(translateService);
		component.question = {};
		component.value = '';
		component.registerOnTouched();
		expect(component.value).toEqual('');
	});
	it('should registerOnChange', () => {
		const component = new DatepickerComponent(translateService);
		component.question = {};
		component.value = '';
		component.registerOnChange(propagateChange);
		expect(component.value).toEqual('');
	});
	it('should writeValue - null', () => {
		const component = new DatepickerComponent(translateService);
		component.question = {html: ''};
		component.value = '';
		component.writeValue();
		expect(component.value).toEqual('');
	});
	it('should writeValue', () => {
		const component = new DatepickerComponent(translateService);
		component.question = {};
		component.value = '';
		component.writeValue('tony');
		expect(component.value).toEqual('tony');
	});
	it('should saveValue', () => {
		const component = new DatepickerComponent(translateService);
		component.question = {html: '', key: ''};
		component.form = form;
		component.value = '';
		component.saveValue({value:'tony', valid:true});
		expect(component.value).toEqual('tony');
	});
	it('should saveValue - null', () => {
		const component = new DatepickerComponent(translateService);
		component.question = {};
		component.form = form;
		component.value = '';
		component.saveValue({value:null, valid:true});
		expect(component.value).toEqual(null);
	});

}) 

