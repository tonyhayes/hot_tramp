import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule } from '../../framework/nga.module';
import { routing } from './logged-out.routing';

import { LoggedOut } from './logged-out.component';

@NgModule({
	imports: [
		CommonModule,
		NgaModule,
		routing,
	],
  	providers: [
  	],
	declarations: [
		LoggedOut,
		
	]
})
export default class LoggedOutModule {}
