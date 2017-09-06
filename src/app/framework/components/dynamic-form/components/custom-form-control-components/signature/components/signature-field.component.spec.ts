import { SignatureFieldComponent } from './signature-field.component';

describe('SignatureFieldComponent', () => {
	const propagateChange:any = () => {
		return 'value'
	};
  	const tag = new SignatureFieldComponent();
	const signaturePad = {
		clear : ()=> {},
		fromDataURL : ()=> {}
	}
  
	//specs
	it('should set and get a value', () => {
		const component = new SignatureFieldComponent();
		component.question = {};
		expect(component._signature).toEqual(null);
	});
	it('should clear', () => {
		const component = new SignatureFieldComponent();
		component.question = {};
		component.signaturePad = signaturePad
		component.clear();
		expect(component.signature).toEqual('');
	});

	it('should drawBegin', () => {
		const component = new SignatureFieldComponent();
		component.question = {};
		component.signature = '';
		component.drawBegin();
		expect(component.signature).toEqual('');
	});
	it('should ngAfterViewInit', () => {
		const component = new SignatureFieldComponent();
		component.signaturePad = signaturePad
		component.question = {};
		component.signature = '';
		component.ngAfterViewInit();
		expect(component.signature).toEqual('');
	});
	it('should registerOnTouched', () => {
		const component = new SignatureFieldComponent();
		component.question = {};
		component.signature = '';
		component.registerOnTouched();
		expect(component.signature).toEqual('');
	});
	it('should registerOnChange', () => {
		const component = new SignatureFieldComponent();
		component.question = {};
		component.signature = '';
		component.registerOnChange(propagateChange);
		expect(component.signature).toEqual('');
	});
	it('should writeValue - null', () => {
		const component = new SignatureFieldComponent();
		component.question = {};
		component.signature = '';
		component.writeValue();
		expect(component.signature).toEqual('');
	});
	it('should writeValue', () => {
		const component = new SignatureFieldComponent();
		component.question = {};
		component.signature = '';
		component.signaturePad = signaturePad
		component.writeValue('tony');
		expect(component.signature).toEqual('tony');
	});

}) 

