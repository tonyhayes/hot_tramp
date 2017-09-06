
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import {
//   	inject,
//   	async,
//   	TestBed,
//   	ComponentFixture
// } from '@angular/core/testing';

// // Load the implementations that should be tested
// import { App } from './app.component';
// import { GlobalState } from './global.state';
// import { ImageLoaderService, ThemeSpinner } from './framework/services';
// import { ThemeConfigService } from './framework/theme.config.service';
// import { ThemeConfig } from './framework/theme.config';
// import { Auth } from './auth.service';
// import { Router } from '@angular/router';
// import { AppState } from './app.service';
// import { TRANSLATIONS, translationDictionary, TranslateService }   from './translate';
// import { AUTH_PROVIDERS, provideAuth }      from 'angular2-jwt';
// import { APP_BASE_HREF, DatePipe } from '@angular/common';
// import { Util } from './framework/helpers/util';

//  const subdomain = () =>{
// 	//admin.dexchadev.com/mech-co"
// 	return;

// }
//  window.APP_TITLE = 'Spectrum';

// describe(`App`, () => {
//   	let comp: App;
//   	let fixture: ComponentFixture<App>;
// 	let mockRouter = {
// 	  	navigate: jasmine.createSpy('navigate')
// 	}  

//   // async beforeEach
//   beforeEach(async(() => {
// 	TestBed.configureTestingModule({
// 	  	declarations: [ App ],
// 	  	schemas: [NO_ERRORS_SCHEMA],
// 	  	providers: [
//       	AppState,
//       	App,
//       	DatePipe,
//       	GlobalState,
//       	ImageLoaderService, ThemeSpinner,
//       	ThemeConfig, ThemeConfigService, TranslateService,
//       	Auth, { provide: Router, useValue: mockRouter }, provideAuth({
// 	   		//disable client jwt expiration check (http://angular-js.in/angular2-jwt/)
//       		noClientCheck: true,
//     	}),
// 		{ provide: TRANSLATIONS, useValue: translationDictionary },
// 		{ provide: APP_BASE_HREF }

// ]
// 	})
// 		.compileComponents(); // compile template and css
//   	}));

//   	// synchronous beforeEach
//   	beforeEach(() => {
// 		fixture = TestBed.createComponent(App);
// 		comp    = fixture.componentInstance;

// 		fixture.detectChanges(); // trigger initial data binding
//   	});

//   	it(`should be readly initialized`, () => {
// 		expect(fixture).toBeDefined();
// 		expect(comp).toBeDefined();
//   	});
// });







// import {
//   inject,
//   TestBed
// } from '@angular/core/testing';
// import { Router } from '@angular/router';

// // Load the implementations that should be tested
// import { App } from './app.component';
// import { AppState } from './app.service';
// import { GlobalState } from './global.state';
// import { ImageLoaderService, ThemePreloader, ThemeSpinner } from './framework/services';
// import { ThemeConfig } from './framework/theme.config';
// import { ThemeConfigService } from './framework/theme.config.service';
// import { Auth } from './auth.service';
// import { TranslateService, TRANSLATION_PROVIDERS } from './translate';
// import { AUTH_PROVIDERS, provideAuth }      from 'angular2-jwt';

// describe('App', () => {
// 	let mockRouter = {
// 	  	navigate: jasmine.createSpy('navigate')
// 	}  
// 	 // provide our implementations or mocks to the dependency injector
//   beforeEach(() => TestBed.configureTestingModule({
//     providers: [
//       	AppState,
//       	App,
//       	GlobalState,
//       	ImageLoaderService, ThemePreloader, ThemeSpinner,
//       	ThemeConfig, ThemeConfigService, TranslateService, TRANSLATION_PROVIDERS,
//       	Auth, { provide: Router, useValue: mockRouter }, provideAuth
//     ]}));

// 	it('should maintain a global state', inject([ App, GlobalState,  ImageLoaderService, ThemeSpinner, ThemeConfig, TRANSLATION_PROVIDERS, TranslateService, Auth, Router, provideAuth], (app) => {
// 		expect(app.state).toBeDefined();
// 		expect(app.state.data).toBeDefined();
// 		expect(app.state.dataStream$).toBeDefined();
// 		expect(app.state.subscriptions).toBeDefined();
// 	}));
// 	it('should have isMenuCollapsed = false', inject([ App, GlobalState,  ImageLoaderService, ThemeSpinner, ThemeConfig, TRANSLATION_PROVIDERS, TranslateService, Auth, Router, provideAuth], (app) => {
// 		expect(app.imageLoader).toBeDefined();
// 		expect(app.spinner).toBeDefined();
// 		expect(app.isMenuCollapsed).toBeDefined();
// 		expect(app.isMenuCollapsed).toEqual(false);
// 	}));

// });