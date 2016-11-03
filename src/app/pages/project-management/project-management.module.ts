import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }  from '@angular/http';
import { NgaModule } from '../../theme/nga.module';

import { ProjectManagement } from './project-management.component';
import { routing } from './project-management.routing';
import { QuestionService } 						from './question.service';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
    	HttpModule,
		NgaModule,
		routing,
	],
  	providers: [
  		QuestionService
  	],
	declarations: [
		ProjectManagement,
	]
})
export default class ProjectManagementModule {}
