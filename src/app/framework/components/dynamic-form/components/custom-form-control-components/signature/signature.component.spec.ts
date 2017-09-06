import { SignatureComponent } from './signature.component';
import { SignatureQuestion } from '../../question-signature';

describe('SignatureComponent', () => {

	const   sigContainer1 = {
		first: {
			nativeElement: {
				clientWidth: 59,
				clientHeight: 77
			},
			signaturePad: {
				set : ()=> {}
			},
			clear: ()=> {} 
		},
		last: {
			nativeElement: {
				clientWidth: 59,
				clientHeight: 77
			},
			signaturePad: {
				set : ()=> {}
			},
			clear: ()=> {} 
		}
	}
	const   sig = {
		signaturePad: {
			set : ()=> {}
		}
	}
	//specs
	it('should ngAfterViewInit', () => {
		const component = new SignatureComponent();
		component.sigContainer1 = sigContainer1
		component.sigs = sigContainer1
		component.sig = sig
		component.question = {};
		component.ngAfterViewInit()
	  	expect(component).toBeDefined();
	});
	it('should setOptions', () => {
		const component = new SignatureComponent();
		component.sigContainer1 = sigContainer1
		component.sigs = sigContainer1
		component.sig = sig
		component.question = {};
		component.setOptions()
	  	expect(component).toBeDefined();
	});
	it('should clear', () => {
		const component = new SignatureComponent();
		component.sigContainer1 = sigContainer1
		component.sigs = sigContainer1
		component.sig = sig
		component.question = {};
		component.clear()
	  	expect(component).toBeDefined();
	});

}) 

