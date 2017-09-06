import { Component, ViewChild, QueryList, ElementRef, Input, forwardRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { Exif } from '../../../../../helpers/exif';
import { Util } from '../../../../../helpers/util';
import { TranslateService } from '../../../../../../translate';

@Component({
	selector: 'dc-photo',
	templateUrl: './photo.component.html',
	styleUrls: ['./photo.component.scss'],
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PhotoComponent), multi: true },
	]
})

export class PhotoComponent {

	@Input() question;
	@Input() form: FormGroup;
	data:any;
	cropperSettings:CropperSettings;
	croppedWidth:number;
	croppedHeight:number;
	@ViewChild('cropper') cropper:ImageCropperComponent;
	@ViewChild('myInput') myInputVariable: any;
   
	loadedImage;
	_photo;
	propagateChange: any = () => { };
	meta = {
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
	dateTime
 
	constructor(private cdRef:ChangeDetectorRef, private translate: TranslateService) {}
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

		this.cropperSettings = new CropperSettings();
		this.cropperSettings.width = 200;
		this.cropperSettings.height = 200;

		this.cropperSettings.croppedWidth = 200;
		this.cropperSettings.croppedHeight = 200;

		this.cropperSettings.canvasWidth = 500;
		this.cropperSettings.canvasHeight = 300;

		this.cropperSettings.minWidth = 10;
		this.cropperSettings.minHeight = 10;

		this.cropperSettings.rounded = false;
		this.cropperSettings.keepAspect = true;

		this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(72,169,66,3)';
		this.cropperSettings.cropperDrawSettings.strokeWidth = 8;

		this.cropperSettings.noFileInput = true;
		this.data = {};



		if(this.question.value){
			this.loadedImage = this.question.value.img;
			this.meta = this.question.value.meta
			if(this.meta && this.meta.dateTime){
				const dt = this.meta.dateTime.split(' ');
				if(dt.length){
					const d = Util.formatDisplayDate(dt[0], 'yyyy-mm-dd', ':', this.translate.instant('DATE_FORMAT'), this.translate.instant('DATE_SEPERATOR'))			
					const t = Util.militaryTimeToStandard(dt[1])
					this.dateTime = `${d} ${t}`			
				}				
			}
		}
	}

	cropped(bounds:Bounds) {
		this.croppedHeight =this.cropperSettings.height;
		this.croppedWidth = this.cropperSettings.width;
		this.saveValue();
	}
  
	fileChangeListener($event) {
		const file:File = $event.target.files[0];
		this.openFile(file);
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
 			this.cropper.setImage(image);
			this.meta = meta;
			if(this.meta.dateTime){
				const dt = this.meta.dateTime.split(' ');
				if(dt.length){
					const d = Util.formatDisplayDate(dt[0], 'yyyy-mm-dd', ':', this.translate.instant('DATE_FORMAT'), this.translate.instant('DATE_SEPERATOR'))			
					const t = Util.militaryTimeToStandard(dt[1])
					this.dateTime = `${d} ${t}`			
				}				
			}
	 	},10);
	}
	saveValue() {
		this.form.patchValue({ [this.question.key]:{ img: this.data.image, meta: this.meta } });
		this.question.value = { img: this.data.image, meta: this.meta };

	}	
	clear() {
		this.data = {}
		this.dateTime = null
		this.meta.dateTime = null
		this.meta.gpsInfo = {
			long: null,
			lat: null,
			longGeoCode: null,
			latGeoCode: null,
			longitudeRef: null,
			latitudeRef: null
		}
		this.loadedImage = null;
		this.form.patchValue({ [this.question.key]:null});
		this.question.value = null;

	}	


}