import { Component } from '@angular/core';

import { BasicTablesService } from '../../basicTables.service';

@Component({
  	selector: 'striped-table',
  	templateUrl: './stripedTable.html'
})
export class StripedTable {

  	smartTableData:Array<any>;

  	constructor(private basicTablesService: BasicTablesService) {
    	this.smartTableData = basicTablesService.smartTableData;
  	}
}
