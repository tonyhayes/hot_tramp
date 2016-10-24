import { 
	Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer 
} from '@angular/core';

import { Ng2Uploader } from 'ng2-uploader/ng2-uploader';

@Component({
  	moduleId: module.id,
	selector: 'dc-picture-uploader',
	styleUrls: [ 'picture-uploader.component.scss' ],
	templateUrl: 'picture-uploader.component.html',
	providers: [ Ng2Uploader ]
})
export class PictureUploader {

	@Input() defaultPicture:string = '';
	@Input() picture:string = '';

	@Input() uploaderOptions:any = {};
	@Input() canDelete:boolean = true;

	_onUpload:EventEmitter<any> = new EventEmitter();
	_onUploadCompleted:EventEmitter<any> = new EventEmitter();

	@ViewChild('fileUpload') protected fileUpload:ElementRef;

	public uploadInProgress:boolean = false;

	constructor(private renderer:Renderer, protected uploader:Ng2Uploader) {
	}

	public ngOnInit():void {
		if (this.canUploadOnServer()) {
			setTimeout(() => {
				this.uploader.setOptions(this.uploaderOptions);
			});

			this.uploader._emitter.subscribe((data) => {
				this.onUpload(data);
			});
		} else {
			console.warn('Please specify url parameter to be able to upload the file on the back-end');
		}
	}

	public onFiles():void {
		let files = this.fileUpload.nativeElement.files;

		if (files.length) {
			const file = files[0];
			this.changePicture(file);

			if (this.canUploadOnServer()) {
				this.uploadInProgress = true;
				this.uploader.addFilesToQueue(files);
			}
		}
	}

	public bringFileSelector():boolean {
		this.renderer.invokeElementMethod(this.fileUpload.nativeElement, 'click');
		return false;
	}

	public removePicture():boolean {
		this.picture = '';
		return false;
	}

	protected changePicture(file:File):void {
		const reader = new FileReader();
		reader.addEventListener('load', (event:Event) => {
			this.picture = (<any> event.target).result;
		}, false);
		reader.readAsDataURL(file);
	}

	protected onUpload(data):void {
		if (data['done'] || data['abort'] || data['error']) {
			this.onUploadCompleted(data);
		} else {
			this._onUpload.emit(data);
		}
	}

	protected onUploadCompleted(data):void {
		this.uploadInProgress = false;
		this._onUploadCompleted.emit(data);
	}

	protected canUploadOnServer():boolean {
		return !!this.uploaderOptions['url'];
	}
}
