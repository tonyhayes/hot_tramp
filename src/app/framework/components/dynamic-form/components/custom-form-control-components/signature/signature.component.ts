import { Component, ViewChildren, QueryList, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SignatureFieldComponent } from "./components/signature-field.component";

@Component({
	selector: 'dc-signature',
	templateUrl: './signature.component.html',
	styleUrls: ['./signature.component.scss']
})

export class SignatureComponent {

	@Input() question;
	@Input() form: FormGroup;

	@ViewChildren(SignatureFieldComponent) public sigs: QueryList<SignatureFieldComponent>;
	@ViewChildren('sigContainer1') public sigContainer1: QueryList<ElementRef>;
	signatureImage;

	constructor() {}

	ngOnInit(){
		if(this.question.value){
			console.log(this.question.value)
			this.signatureImage = this.question.value;
		}
	}

	ngAfterViewInit() {
		//wait
		if(this.signatureImage){
			return;
		}
		setTimeout(() => this.beResponsive());
//		this.setOptions();

	}

  // set the dimensions of the signature pad canvas
   beResponsive() {
		console.log('Resizing signature pad canvas to suit container size')
		this.size(this.sigContainer1.first, this.sigs.first);
	}

	size(container: ElementRef, sig: SignatureFieldComponent){
		if(sig.signaturePad){
			sig.signaturePad.set('canvasWidth', container.nativeElement.clientWidth);
			sig.signaturePad.set('canvasHeight', container.nativeElement.clientHeight);			
		}
	}

	setOptions() {
//    	this.sigs.first.signaturePad.set('penColor', 'rgb(255, 0, 0)');
	}

	clear() {
		this.sigs.first.clear();
		this.sigs.last.clear();
	}
}