import { PhotoMultiComponent } from './photo-multi.component';

describe('PhotoMultiComponent', () => {
	const propagateChange:any = () => {
		return 'value'
	};
	const form = {
		patchValue: () => {
			return 'value'
		}
	};

	//specs
	it('should ngOnInit', () => {
		const component = new PhotoMultiComponent();
		component.question = {};
		component.form = form;
		component.ngOnInit()
	  	expect(component.data).toEqual({});
	});
	it('should be a photo - undefined', () => {
		const component = new PhotoMultiComponent();
		component.form = form;
		expect(component.photo).toEqual(undefined);
	});
	it('should return Select for writeValue()', () => {
		const component = new PhotoMultiComponent();
		component.form = form;
		component.writeValue(null)
		expect(component.photo).toEqual(undefined);
	});
	it('should return 10 for writeValue(10)', () => {
		const component = new PhotoMultiComponent();
		component.form = form;
		component.writeValue('10')
		expect(component.photo).toEqual('10');
	});
	it('should propagateChange for registerOnChange', () => {
		const component = new PhotoMultiComponent();
		component.form = form;
		component.registerOnChange(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
	});
	it('should propagateChange for registerOnTouched', () => {
		const component = new PhotoMultiComponent();
		component.form = form;
		component.registerOnTouched(propagateChange);
		expect(component.propagateChange).toBeDefined();
	});

}) 

