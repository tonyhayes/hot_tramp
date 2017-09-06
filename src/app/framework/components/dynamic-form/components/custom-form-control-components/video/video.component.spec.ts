import { VideoComponent } from './video.component';

describe('VideoComponent', () => {
	const propagateChange:any = () => {
		return 'value'
	};
  	const tag = new VideoComponent();
	const form = {
		patchValue: () => {
			return 'value'
		}
	};
  
	//specs
	it('should set and get a value', () => {
		const component = new VideoComponent();
		component.question = {};
		expect(component._value).toEqual('');
	});
	it('should registerOnTouched', () => {
		const component = new VideoComponent();
		component.question = {};
		component.value = '';
		component.registerOnTouched();
		expect(component.value).toEqual('');
	});
	it('should registerOnChange', () => {
		const component = new VideoComponent();
		component.question = {};
		component.value = '';
		component.registerOnChange(propagateChange);
		expect(component.value).toEqual('');
	});
	it('should writeValue - null', () => {
		const component = new VideoComponent();
		component.question = {html: ''};
		component.value = '';
		component.writeValue();
		expect(component.value).toEqual('');
	});
	it('should writeValue', () => {
		const component = new VideoComponent();
		component.question = {};
		component.value = '';
		component.writeValue('tony');
		expect(component.value).toEqual('tony');
	});

}) 

