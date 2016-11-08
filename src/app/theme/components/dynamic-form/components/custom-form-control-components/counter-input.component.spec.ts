import { CounterInputComponent } from './counter-input.component';

describe('CounterInputComponent', () => {
	const propagateChange:any = () => {
		return 'value'
	};
  
	//specs
	it('should be a counterValue of 0', () => {
		const component = new CounterInputComponent();
		expect(component.counterValue).toEqual(0);
	});
	it('should return 0 for writeValue()', () => {
		const component = new CounterInputComponent();
		component.writeValue(null)
		expect(component.counterValue).toEqual(0);
	});
	it('should return 10 for writeValue(10)', () => {
		const component = new CounterInputComponent();
		component.writeValue(10)
		expect(component.counterValue).toEqual(10);
	});
	it('should return 1 for increase()', () => {
		const component = new CounterInputComponent();
		component.increase()
		expect(component.counterValue).toEqual(1);
		component.increase()
		expect(component.counterValue).toEqual(2);
	});
	it('should return 0 for decrease()', () => {
		const component = new CounterInputComponent();
		component.increase()
		expect(component.counterValue).toEqual(1);
		component.increase()
		expect(component.counterValue).toEqual(2);
		component.decrease()
		component.decrease()
		expect(component.counterValue).toEqual(0);
	});
	it('should propagateChange for registerOnChange', () => {
		const component = new CounterInputComponent();
 		component.registerOnChange(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
	});
	it('should propagateChange for registerOnTouched', () => {
		const component = new CounterInputComponent();
		component.registerOnTouched(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
	});

}) 

