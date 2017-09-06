import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule } from '../../framework/nga.module';

import { ProjectManagementAdministration } from './project-management-administration.component';
import { 
	ProjectManagementAdministrationDashboard, 
	CategoryList, 
	FormList, 
	ProjectList, 
	JobList, 
	CategoryAdd, 
	FormAdd, 
	ProjectAdd, 
	JobAdd,
	FormDesign  
} from './components';
import { routing } from './project-management-administration.routing';
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
		ProjectManagementAdministration,
		ProjectManagementAdministrationDashboard,
		CategoryList, FormList, ProjectList, JobList,		
		CategoryAdd, FormAdd, ProjectAdd, JobAdd,
		FormDesign		
	],
})
export default class ProjectManagementAdministrationModule {}
