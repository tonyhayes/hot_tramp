import './app.loader.ts';
import { Component, ViewEncapsulation, 	ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalState } from './global.state';
import { Auth } from './auth.service';
import { ImageLoaderService, ThemePreloader, ThemeSpinner } from './framework/services';
import { layoutPaths } from './framework/theme.constants';
import { ThemeConfig } from './framework/theme.config';
import { Util } from './framework/helpers/util';
import * as toastr from 'toastr';
/*
 * App Component
 * Top Level Component
 */
@Component({
	selector: 'app',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./app.component.scss'],
	template: `
		<main [class.menu-collapsed]="isMenuCollapsed" dcThemeRun>
			<router-outlet></router-outlet>
		</main>
		<dc-footer></dc-footer>
	`
})
export class App {

	private isMenuCollapsed: boolean = false;
	private homeRoute: string = '/user-administration/user-list';

	constructor(private router: Router, 
		private state: GlobalState,
		private imageLoader: ImageLoaderService,
		private spinner: ThemeSpinner,
		private themeConfig: ThemeConfig,
		private auth: Auth,
		private cdRef:ChangeDetectorRef) {}

	ngOnInit():void {

		this.themeConfig.config();
		this.loadImages();
		this.state.subscribe('menu.isCollapsed', (isCollapsed) => {
			this.isMenuCollapsed = isCollapsed;
			this.cdRef.detectChanges();
		});
		this.state.subscribe('logout', (isOff) => {
			this.auth.logout();
		});
		toastr.options = {
		  	"positionClass": "toast-top-center",
		  	"preventDuplicates": true,
		}
//		this.auth.handleAuthentication();
		this.getAppDetails();
	}

	ngAfterViewInit(): void {
		// hide spinner once all loaders are completed
		ThemePreloader.load().then((values) => {
			this.spinner.hide();
		});
	}
	getAppDetails() {
		//hack to find the app
		const app = Util.getAppDetails()
		this.state.notify('app.API_REST_URL', app.API_REST_URL );
		this.state.notify('app.API_WEATHER_UNDERGROUND_URL', app.API_WEATHER_UNDERGROUND_URL );
		this.state.notify('app.API_DARKSKY_URL', app.API_DARKSKY_URL );
		this.state.notify('app.CLIENT_ID', app.CLIENT_ID );
		this.state.notify('app.APP_TITLE', app.APP_TITLE );
		this.state.notify('app.APP_NAME', app.APP_NAME );
	};

	ngOnDestroy():void {
		this.auth.logout();
	}

	loadPage(page):void {
		console.log('here')
		if(!page){
	    	this.router.navigate( [ this.homeRoute ] );
		}
    	this.router.navigate( [ page ] );
	}

	loadImages(): void {
		// register some loaders
		ThemePreloader.registerLoader(this.imageLoader.load(layoutPaths.images.root + 'blue-bg.jpg'));
	}
}


