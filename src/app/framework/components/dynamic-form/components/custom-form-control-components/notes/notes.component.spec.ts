import { NotesComponent } from './notes.component';

describe('NotesComponent', () => {
	const propagateChange:any = () => {
		return 'value'
	};
  	const tag = new NotesComponent();
	const form = {
		patchValue: () => {
			return 'value'
		}
	};
  
	//specs
	it('should set and get a value', () => {
		const component = new NotesComponent();
		component.question = {};
		expect(component._value).toEqual('');
	});
	it('should logSelection', () => {
		const component = new NotesComponent();
		component.question = {};
		component.logSelection('tony');
		expect(component.value).toEqual('');
	});
	it('should logChange', () => {
		const component = new NotesComponent();
		component.form = form;
		component.question = {};
		component.value = '';
		component.logChange({html:'tony'});
		expect(component.value).toEqual('tony');
	});

	it('should ngOnInit', () => {
		const component = new NotesComponent();
		component.form = form;
		component.value = '';
		component.question = {value: '', key: ''};
		component.ngOnInit();
		expect(component.value).toEqual('');
	});
	it('should registerOnTouched', () => {
		const component = new NotesComponent();
		component.question = {};
		component.value = '';
		component.registerOnTouched();
		expect(component.value).toEqual('');
	});
	it('should registerOnChange', () => {
		const component = new NotesComponent();
		component.question = {};
		component.value = '';
		component.registerOnChange(propagateChange);
		expect(component.value).toEqual('');
	});
	it('should writeValue - null', () => {
		const component = new NotesComponent();
		component.question = {html: ''};
		component.value = '';
		component.writeValue();
		expect(component.value).toEqual('');
	});
	it('should writeValue', () => {
		const component = new NotesComponent();
		component.question = {};
		component.value = '';
		component.writeValue('tony');
		expect(component.value).toEqual('tony');
	});

}) 

