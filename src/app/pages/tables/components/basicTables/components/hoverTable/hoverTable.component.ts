import { Component } from '@angular/core';

import { BasicTablesService } from '../../basicTables.service';

@Component({
  	moduleId: module.id,
  	selector: 'hover-table',
  	templateUrl: 'hoverTable.html'
})
export class HoverTable {

  	metricsTableData:Array<any>;

  	constructor(private basicTablesService: BasicTablesService) {
    	this.metricsTableData = basicTablesService.metricsTableData;
  	}
}
