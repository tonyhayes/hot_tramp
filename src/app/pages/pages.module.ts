import { NgModule }      from '@angular/core';

import { routing }       from './pages.routing';
import { NgaModule } from '../framework/nga.module';

import { Pages } from './pages.component';

@NgModule({
  	imports: [ NgaModule, routing ],
  	declarations: [ Pages ]
})
export class PagesModule {}
