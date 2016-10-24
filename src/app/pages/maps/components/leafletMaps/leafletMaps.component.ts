import { Component, ViewEncapsulation, ElementRef } from '@angular/core';

import './leafletMaps.loader';

@Component({
	moduleId: module.id,
	selector: 'leaflet-maps',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['leafletMaps.scss'],
	templateUrl: 'leafletMaps.html'
})
export class LeafletMaps {

  	constructor(private elementRef:ElementRef) {}

  	ngAfterViewInit() {
		let el = this.elementRef.nativeElement.querySelector('.leaflet-maps');

		L.Icon.Default.imagePath = 'assets/img/theme/vendor/leaflet';
		var map = L.map(el).setView([51.505, -0.09], 13);
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	  		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		L.marker([51.5, -0.09]).addTo(map)
	  	.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
	  	.openPopup();
  	}
}
