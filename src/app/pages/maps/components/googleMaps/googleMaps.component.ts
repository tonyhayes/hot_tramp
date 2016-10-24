import { Component, ElementRef } from '@angular/core';
import { GoogleMapsLoader } from './googleMaps.loader';

@Component({
	moduleId: module.id,
	selector: 'google-maps',
	styleUrls: ['googleMaps.scss'],
	templateUrl: 'googleMaps.html',
})
export class GoogleMaps {

  	constructor(private elementRef:ElementRef) {}

  	ngAfterViewInit() {
		let el = this.elementRef.nativeElement.querySelector('.google-maps');

		// TODO: do not load this each time as we already have the library after first attempt
		GoogleMapsLoader.load((google) => {
	  		new google.maps.Map(el, {
				center: new google.maps.LatLng(44.5403, -78.5463),
				zoom: 8,
				mapTypeId: google.maps.MapTypeId.ROADMAP
	  		});
		});
  	}
}
