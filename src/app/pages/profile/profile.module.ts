import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }  from '@angular/http';
import { NgaModule } from '../../theme/nga.module';

import { Profile } from './profile.component';
import { routing } from './profile.routing';
import { QuestionService } 						from './question.service';

import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import reducer from './reducers';
import { HeroActions } from './actions';
import { HeroService } from './services';
import { HeroEffects } from './effects';

import { HeroList } from './hero-list.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
    	HttpModule,
		NgaModule,
		routing,
    	StoreModule.provideStore(reducer),
    	EffectsModule.run(HeroEffects),
	],
  	providers: [
		QuestionService,
		HeroActions, HeroService
  	],
	declarations: [
		Profile,
		HeroList
	]
})
export default class ProfileModule {}
