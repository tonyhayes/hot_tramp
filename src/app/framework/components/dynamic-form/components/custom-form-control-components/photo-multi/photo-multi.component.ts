import { Component, ViewChild, ViewChildren, QueryList, ElementRef, Input, forwardRef } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PhotoFieldComponent } from "./components/photo-field.component";
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { Exif } from '../../../../../helpers/exif';
import { Util } from '../../../../../helpers/util';

@Component({
	selector: 'dc-photo-multi',
	templateUrl: './photo-multi.component.html',
	styleUrls: ['./photo-multi.component.scss'],
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PhotoMultiComponent), multi: true },
	]
})

export class PhotoMultiComponent {

	@Input() question;
	@Input() form: FormGroup;
	data:any;
	@ViewChildren(PhotoFieldComponent) public photos: QueryList<PhotoFieldComponent>;
	@ViewChild('myInput') myInputVariable: any;
 
	loadedImage;
	newImages = [];
	loadedImages = [];
	_photo;
	propagateChange: any = () => { };

	constructor() {}
	get photo(): any {
		return this._photo;
	}

	set photo(value: any) {
		this._photo = value;
		console.log('set photo to ' + this._photo);
		this.propagateChange(this.photo);
	}

	writeValue(value: any): void {
		if (!value) {
			return;
		}
		this.photo = value;
	}

	registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}

	registerOnTouched(): void {
		// no-op
	}


	ngOnInit(){

		this.data = {};

		if(this.question.value){
			this.loadedImage = true;
			this.question.value.forEach( value =>{
				this.loadedImages.push(value)
			})
		}
	}

	photoChange(photo){
		const images = [];
		this.photos.forEach(foto =>{
			// if image has been cleared, then regenerate images array
			// otherwise just save the array
			if(foto.data.src || foto.loadedImage){
				images.push({ img: foto.data.src || foto.loadedImage, meta: foto.meta });					
			}
		})
		if(!images.length){
			this.loadedImage = null;
			this.loadedImages = [];
			this.newImages = [];
		}
		this.saveValue(images)
	}

	fileChangeListener($event) {
//		this.loadedImage = false;
		const files = $event.target.files;
	    for (let file in files) {
	        // skip loop if the property is from prototype
	        if(!files.hasOwnProperty(file)) continue;

			this.openFile(files[file])
	    }
		this.myInputVariable.nativeElement.value = "";
	}

	openFile(input) {
		var that = this;
	    var reader = new FileReader();
	    reader.onload = function(){
	      	var dataURL = reader.result;
			var image:HTMLImageElement = new Image();
			image.src = dataURL;
		  	Exif.getData(image, function () {
				let meta = {
					dateTime: null,
					gpsInfo: {
						long: null,
						lat: null,
						longGeoCode: null,
						latGeoCode: null,
						longitudeRef: null,
						latitudeRef: null
					}
				}

			  	meta.dateTime = Exif.getTag(this, 'DateTime');
			  	meta.gpsInfo.long = Exif.getTag(this, 'GPSLongitude');
			  	meta.gpsInfo.lat = Exif.getTag(this, 'GPSLatitude');
				meta.gpsInfo.longitudeRef = Exif.getTag(this, 'GPSLongitudeRef');
				meta.gpsInfo.latitudeRef = Exif.getTag(this, 'GPSLatitudeRef');
			  	if(meta.gpsInfo.long && meta.gpsInfo.lat){
			  		meta.gpsInfo.longGeoCode = Util.getLongitude(Util.toDecimal(meta.gpsInfo.long), meta.gpsInfo.longitudeRef);
			  		meta.gpsInfo.latGeoCode = Util.getLatitude(Util.toDecimal(meta.gpsInfo.lat), meta.gpsInfo.latitudeRef);
			  	}
				that.setImage(image, meta);
		  	});
	    };
	    reader.readAsDataURL(input);
	}
	setImage(image, meta){
		setTimeout(() => {
	  		this.newImages.push( { img: image, meta: meta } )
	 	},10);
	}

	saveValue(images) {
		this.form.patchValue({ [this.question.key]: images });
		this.question.value = images;

	}	


}