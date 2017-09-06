import { WeatherUndergroundComponent } from './weather-underground.component';

describe('WeatherUndergroundComponent', () => {
	const propagateChange:any = () => {
		return 'value'
	};
	const form = {
		patchValue: () => {
			return 'value'
		}
	};
	const weatherStore = {
		dispatch: ()=>{},		
		select: ()=>{
		  return {subscribe: ()=> {}}
		}		
	}
	const pmActions = {
		loadWeather: ()=>{},		
	}

	//specs
	it('should ngOnInit', () => {
		const component = new WeatherUndergroundComponent();
		component.question = {};
		component.weatherStore = weatherStore;
		component.pmActions = pmActions;
		component.form = form;
		component.ngOnInit()
	  	expect(component.observation).toEqual(undefined);
	});
	it('should be a observation - undefined', () => {
		const component = new WeatherUndergroundComponent();
		component.form = form;
		expect(component.observation).toEqual(undefined);
	});
	it('should return Select for writeValue()', () => {
		const component = new WeatherUndergroundComponent();
		component.form = form;
		component.writeValue(null)
		expect(component.observation).toEqual(undefined);
	});
	it('should return 10 for writeValue(10)', () => {
		const component = new WeatherUndergroundComponent();
		component.form = form;
		component.writeValue('10')
		expect(component.observation).toEqual('10');
	});
	it('should propagateChange for registerOnChange', () => {
		const component = new WeatherUndergroundComponent();
		component.form = form;
		component.registerOnChange(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
	});
	it('should propagateChange for registerOnTouched', () => {
		const component = new WeatherUndergroundComponent();
		component.form = form;
		component.registerOnTouched(propagateChange);
		expect(component.propagateChange).toBeDefined();
	});

}) 

