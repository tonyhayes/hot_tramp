import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { UserAdministration } from './user-administration.component';
import { UserList, UserDetails } from './components';
import { routing } from './user-administration.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		NgaModule,
		routing,
		FormsModule
	],
  	providers: [
  	],
	declarations: [
		UserAdministration,
		UserList,
		UserDetails
		
	]
})
export default class UserAdministrationModule {}
