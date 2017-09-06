import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule } from '../../framework/nga.module';

import { ProjectManagement } from './project-management.component';
import { FieldReportList, FieldReportHeader, Dashboard,
 Notes 

} from './components';
import { routing } from './project-management.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		NgaModule,
		routing,
		FormsModule,
	],
  	providers: [
  		
  	],
	declarations: [
		ProjectManagement,
		FieldReportList,
		FieldReportHeader,
		Notes,
		Dashboard		
	],
})
export default class ProjectManagementModule {}
