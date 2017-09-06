import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule } from '../../framework/nga.module';
import { routing } from './page-not-found.routing';

import { PageNotFound } from './page-not-found.component';

@NgModule({
	imports: [
		CommonModule,
		NgaModule,
		routing,
	],
  	providers: [
  	],
	declarations: [
		PageNotFound,
		
	]
})
export default class PageNotFoundModule {}
