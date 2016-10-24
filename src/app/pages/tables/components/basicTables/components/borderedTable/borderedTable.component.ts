import { Component } from '@angular/core';

import { BasicTablesService } from '../../basicTables.service';

@Component({
  	moduleId: module.id,
  	selector: 'bordered-table',
  	templateUrl: 'borderedTable.html',
})
export class BorderedTable {

  	metricsTableData:Array<any>;

  	constructor(private basicTablesService: BasicTablesService) {
    	this.metricsTableData = basicTablesService.metricsTableData;
  	}
}
