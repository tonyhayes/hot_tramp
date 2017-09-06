import { PhotoComponent } from './photo.component';

describe('PhotoComponent', () => {
	const propagateChange:any = () => {
		return 'value'
	};
	const form = {
		patchValue: () => {
			return 'value'
		}
	};
	const meta = {
		dateTime: null,
		gpsInfo: {
			long: null,
			lat: null,
			longGeoCode: null,
			latGeoCode: null,
			longitudeRef: null,
			latitudeRef: null
		}
	};
	
	//specs
	it('should ngOnInit', () => {
		const component = new PhotoComponent();
		component.question = {};
		component.form = form;
		component.ngOnInit()
	  	expect(component.cropperSettings.width).toEqual(200);
	});
	it('should clear', () => {
		const component = new PhotoComponent();
		component.question = {};
		component.form = form;
		component.meta = meta;
		component.clear()
	  	expect(component.loadedImage).toEqual(null);
	});
	it('should be a photo - undefined', () => {
		const component = new PhotoComponent();
		component.form = form;
		expect(component.photo).toEqual(undefined);
	});
	it('should return Select for writeValue()', () => {
		const component = new PhotoComponent();
		component.form = form;
		component.writeValue(null)
		expect(component.photo).toEqual(undefined);
	});
	it('should return 10 for writeValue(10)', () => {
		const component = new PhotoComponent();
		component.form = form;
		component.writeValue('10')
		expect(component.photo).toEqual('10');
	});
	it('should propagateChange for registerOnChange', () => {
		const component = new PhotoComponent();
		component.form = form;
		component.registerOnChange(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
	});
	it('should propagateChange for registerOnTouched', () => {
		const component = new PhotoComponent();
		component.form = form;
		component.registerOnTouched(propagateChange);
		expect(component.propagateChange).toBeDefined();
	});

}) 

