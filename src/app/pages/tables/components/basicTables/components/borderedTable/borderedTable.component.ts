import { Component } from '@angular/core';

import { BasicTablesService } from '../../basicTables.service';

@Component({
  	selector: 'bordered-table',
  	templateUrl: './borderedTable.html',
})
export class BorderedTable {

  	metricsTableData:Array<any>;

  	constructor(private basicTablesService: BasicTablesService) {
    	this.metricsTableData = basicTablesService.metricsTableData;
  	}
}
