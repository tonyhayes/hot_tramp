//our root app component
import {  Directive, ElementRef, Renderer } from '@angular/core'

@Directive({
  	selector: 'form[focusInput]'
})
export class FocusInput {
  
  constructor(private eRef: ElementRef, private renderer : Renderer) { }
  
  	private getInputElement(nativeElement: any): any {
		if (!nativeElement || !nativeElement.children) return undefined;
		if (!nativeElement.children.length && nativeElement.localName == 'input' && !nativeElement.hidden) {
			return nativeElement;
		}
		// if ( !nativeElement.children.length && nativeElement.localName == 'button' && !nativeElement.hidden) {
		// 	return nativeElement;
		// }
	
		let input;
	
		[].slice.call(nativeElement.children).every(c => {
	  		input = this.getInputElement(c);
	  		if (input) return false; // break
	  		return true; // continue!
		});
	
		return input;
  	}
  
  	ngAfterViewInit() {
		let formChildren = [].slice.call(this.eRef.nativeElement.children);
	
		formChildren.every(child => {
	  		let input = this.getInputElement(child);
	  
	  		if (input) {
	  			const onElement = this.renderer.selectRootElement(input);
				onElement.focus();
//				this.renderer.invokeElementMethod(input, 'focus', []);
				return false; // break!
	  		}
	  
	  		return true; // continue!
		});
  	}
}