import { Component, ViewEncapsulation } from '@angular/core';
@Component({
  	moduleId: module.id,
  	selector: 'dc-ag-grid',
	encapsulation: ViewEncapsulation.None,
	styles: [require('ag-grid/dist/styles/ag-grid.css'), require('ag-grid/dist/styles/theme-fresh.css')],
	templateUrl: 'ag-grid.component.html'

})
export class AgGrid {

	constructor() {}

}
