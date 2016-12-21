import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule } from '../../theme/nga.module';


import { ProjectManagement } from './project-management.component';
import { routing } from './project-management.routing';

@NgModule({
	imports: [
		CommonModule,
		NgaModule,
		routing,
	],
  	providers: [
  	],
	declarations: [
		ProjectManagement,
		
	]
})
export default class ProjectManagementModule {}
