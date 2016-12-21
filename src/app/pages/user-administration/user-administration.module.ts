import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { UserAdministration } from './user-administration.component';
import { routing } from './user-administration.routing';

@NgModule({
	imports: [
		CommonModule,
		NgaModule,
		routing,
	],
  	providers: [
  	],
	declarations: [
		UserAdministration,
		
	]
})
export default class UserAdministrationModule {}
