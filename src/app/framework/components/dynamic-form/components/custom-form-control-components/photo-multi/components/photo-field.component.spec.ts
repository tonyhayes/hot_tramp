import { PhotoFieldComponent } from './photo-field.component';

describe('PhotoFieldComponent', () => {
	const propagateChange:any = () => {
		return 'value'
	};
	const form = {
		patchValue: () => {
			return 'value'
		}
	};
	const cropper = {
		setImage: () => {
			return 'value'
		}
	};
	const meta = {
		dateTime: null,
		gpsInfo: {
			long: null,
			lat: null,
			longGeoCode: null,
			latGeoCode: null
		}
	};

	//specs
	it('should ngOnInit', () => {
		const component = new PhotoFieldComponent();
		component.question = {};
		component.form = form;
		component.ngOnInit()
	  	expect(component.cropperSettings.width).toEqual(200);
	});
	it('should clear', () => {
		const component = new PhotoFieldComponent();
		component.question = {};
		component.form = form;
		component.meta = meta;
		component.cropper = cropper;
		component.clear()
	  	expect(component.loadedImage).toEqual(null);
	});
	it('should be a photo - undefined', () => {
		const component = new PhotoFieldComponent();
		component.form = form;
		expect(component.photo).toEqual(undefined);
	});

}) 

