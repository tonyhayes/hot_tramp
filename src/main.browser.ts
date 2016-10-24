/*
 * offline bootstraping
 */
require('offline-plugin/runtime').install();
/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './app/environment';
import { bootloader } from '@angularclass/hmr';
import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app';
import { TRANSLATION } from './messages.en';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  return platformBrowserDynamic()
	.bootstrapModule(AppModule,
		{providers: [
			{provide: TRANSLATIONS, useValue: TRANSLATION},
			{provide:TRANSLATIONS_FORMAT, useValue:'xlf'},
			{provide:LOCALE_ID, useValue:'en'}
		]}
	)
	.then(decorateModuleRef)
	.catch(err => console.error(err));

}


bootloader(main);
