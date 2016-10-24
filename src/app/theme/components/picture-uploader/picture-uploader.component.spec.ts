// Load the implementations that should be tested
import { 
	Renderer 
} from '@angular/core';

import { PictureUploader } from './picture-uploader.component';
import { Ng2Uploader } from 'ng2-uploader/ng2-uploader';

describe('PictureUploader', () => {
	// provide our implementations or mocks to the dependency injector
	const renderer = new Renderer();
	const ng2Uploader = new Ng2Uploader();
	const uploader = new PictureUploader(renderer, ng2Uploader);

	it('should define PictureUploader', () => {
	  	expect(PictureUploader).toBeDefined();
	});
	it('should return false for canUploadOnServer', () => {
	  	expect(uploader.canUploadOnServer()).toEqual(false);
	});
	it('should return uploadInProgress = false for onUploadCompleted', () => {
	  	uploader.onUploadCompleted('data');
	  	expect(uploader.uploadInProgress).toEqual(false);
	});
	it('should return uploadInProgress = true for onUpload', () => {
		uploader.uploadInProgress = true;
	  	uploader.onUpload(['data']);
	  	expect(uploader.uploadInProgress).toEqual(true);
	});
	it('should return removePicture = false', () => {
		uploader.picture = 'djdkd';
	  	uploader.removePicture();
	  	expect(uploader.removePicture()).toEqual(false);
	  	expect(uploader.picture).toEqual('');
	});
	it('should return onFiles, uploadInProgress = false', () => {
		uploader.fileUpload = {
			nativeElement:{
				files:[]
			}
		};
		uploader.uploadInProgress = false;
		uploader.onFiles();
	  	expect(uploader.uploadInProgress).toEqual(false);
	});
	it('should return ngOnInit, uploadInProgress = false', () => {
		uploader.uploadInProgress = false;
		uploader.ngOnInit();
	  	expect(uploader.uploadInProgress).toEqual(false);
	});


});