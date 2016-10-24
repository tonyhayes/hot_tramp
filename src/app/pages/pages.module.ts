import { NgModule }      from '@angular/core';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';

@NgModule({
  imports: [NgaModule.forRoot(), routing],
  declarations: [Pages]
})
export class PagesModule {
}
