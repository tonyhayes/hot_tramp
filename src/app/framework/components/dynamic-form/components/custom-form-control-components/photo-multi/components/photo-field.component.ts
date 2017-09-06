import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { Exif } from '../../../../../../helpers/exif';
import { Util } from '../../../../../../helpers/util';
import { TranslateService } from '../../../../../../../translate';

@Component({
	selector: 'dc-photo-field',
	templateUrl: './photo-field.component.html',
	styleUrls: ['./photo-field.component.scss'],
})

export class PhotoFieldComponent {

	@Input() data;
	@Input() loadedImage;
	@Input() meta;
	@Output() photoChange = new EventEmitter<any>();

	cropperSettings:CropperSettings;
	croppedWidth:number;
	croppedHeight:number;
	@ViewChild('cropper', undefined)
	cropper:ImageCropperComponent;
	dateTime
 

	constructor(private translate: TranslateService) {}

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
		if(!this.data){
			this.data = {};
		}
		if(this.meta && this.meta.dateTime){
			const dt = this.meta.dateTime.split(' ');
			if(dt.length){
				const d = Util.formatDisplayDate(dt[0], 'yyyy-mm-dd', ':', this.translate.instant('DATE_FORMAT'), this.translate.instant('DATE_SEPERATOR'))			
				const t = Util.militaryTimeToStandard(dt[1])
				this.dateTime = `${d} ${t}`			
			}			
		}
	}
	ngAfterViewInit(){
		if(this.data.src){
			this.cropper.setImage(this.data);
		}
	}

	cropped(bounds:Bounds) {
		this.croppedHeight =this.cropperSettings.height;
		this.croppedWidth = this.cropperSettings.width;
		this.photoChange.emit({ img: this.data.image, meta: this.meta });
	}
  
	clear() {
		this.data = {};
		this.meta.dateTime = null;
		this.dateTime = null;
		this.meta.gpsInfo.longGeoCode = null;
		this.meta.gpsInfo.latGeoCode = null;
		this.loadedImage = null;
		this.photoChange.emit({ img: null, meta: null });
	}	

}