import { NgModule, ApplicationRef } from '@angular/core';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, RequestOptions }  from '@angular/http';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { Auth }              from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { TRANSLATIONS, translationDictionary, TranslateService }   from './translate';
import { Util } from './framework/helpers/util';

/*
 * Auth0 helper library
 */
import { AUTH_PROVIDERS, provideAuth, AuthHttp, AuthConfig }      from 'angular2-jwt';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { routing } from './app.routing';
import { NgaModule } from './framework/nga.module';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { PagesModule } from './pages/pages.module';

//Redux data management
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducer } from './reducers';
import { QuestionActions, UserAdministrationActions, ProjectManagementActions, WeatherActions } from './actions';
import { QuestionService, UserAdministrationService, MenuService, ProjectManagementService, WeatherService } from './services';
import { QuestionEffects, UserAdministrationEffects, ProjectManagementEffects, WeatherEffects } from './effects';


// Application wide providers
const APP_PROVIDERS = [
	AppState,
	GlobalState,
	MenuService,
	QuestionService, UserAdministrationService, ProjectManagementService, WeatherService,
	QuestionActions, UserAdministrationActions, ProjectManagementActions, WeatherActions,
	Auth,
	AuthGuard,
	TranslateService,
	DatePipe
];

type StoreType = {
	state: InternalStateType,
	restoreInputValues: () => void,
	disposeOldHosts: () => void
};
 const subdomain = () =>{
	//admin.dexchadev.com/mech-co"

	// hack to keep the tenant in the path
	const arrayOfStrings = window.location.pathname.split('/');
	if(arrayOfStrings.length && arrayOfStrings.length > 1){
		let tenant = arrayOfStrings[1];
		if(tenant && !Util.isInvalidTenantName(tenant)){
			localStorage.setItem('tenant', JSON.stringify(tenant));
			return '/'+tenant;			
		}
	}
	return '/';

}
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
		globalHeaders: [{'Content-Type':'application/json'}],
	}), http, options);
}


/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
	bootstrap: [App],
	declarations: [
		App
	],
	imports: [ // import Angular's modules
		BrowserModule,
		RouterModule,
    	HttpModule,
    	NgaModule.forRoot(),
		PagesModule,
		routing,
    	StoreModule.provideStore(reducer),
    	EffectsModule.run(QuestionEffects),
    	EffectsModule.run(UserAdministrationEffects),
    	EffectsModule.run(ProjectManagementEffects),
    	EffectsModule.run(WeatherEffects),

	 ],
	providers: [ // expose our Services and Providers into Angular's dependency injection
		ENV_PROVIDERS,
		APP_PROVIDERS,
		AUTH_PROVIDERS,		
	   	provideAuth({
	   		//disable client jwt expiration check (http://angular-js.in/angular2-jwt/)
      		noClientCheck: true,
    	}),
		{ provide: TRANSLATIONS, useValue: translationDictionary },
		{ provide: APP_BASE_HREF, useValue: subdomain() },
		{
      		provide: AuthHttp,
      		useFactory: authHttpServiceFactory,
      		deps: [Http, RequestOptions]
    	}
	],
})

export class AppModule {

	constructor(public appRef: ApplicationRef, public appState: AppState) {}


	hmrOnInit(store: StoreType) {
		if (!store || !store.state) return;
		console.log('HMR store', JSON.stringify(store, null, 2));
		// set state
		this.appState._state = store.state;
		// set input values
		if ('restoreInputValues' in store) {
			let restoreInputValues = store.restoreInputValues;
			setTimeout(restoreInputValues);
		}
		this.appRef.tick();
		delete store.state;
		delete store.restoreInputValues;
	}

	hmrOnDestroy(store: StoreType) {
		const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
		// save state
		const state = this.appState._state;
		store.state = state;
		// recreate root elements
		store.disposeOldHosts = createNewHosts(cmpLocation);
		// save input values
		store.restoreInputValues = createInputTransfer();
		// remove styles
		removeNgStyles();
	}

	hmrAfterDestroy(store: StoreType) {
		// display new elements
		store.disposeOldHosts();
		delete store.disposeOldHosts;
	}
}
