import './app.loader.ts';
import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalState } from './global.state';
import { Auth } from './auth.service';
import { ImageLoaderService, ThemePreloader, ThemeSpinner } from './theme/services';
import { layoutPaths } from './theme/theme.constants';
import { HeartbeatService } from './theme/services/http-api/heartbeat.service';
import { ThemeConfig } from './theme/theme.config';
/*
 * App Component
 * Top Level Component
 */
@Component({
	selector: 'app',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./app.component.scss'],
	template: `

		<main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
			<div class="additional-bg"></div>
			<router-outlet></router-outlet>
		</main>
	`
})
export class App {

	isMenuCollapsed: boolean = false;

	constructor(private state: GlobalState,
							private imageLoader: ImageLoaderService,
							private spinner: ThemeSpinner,
							private config: ThemeConfig,
							private heartbeat:HeartbeatService,
							private auth: Auth) {}

	public ngOnInit():void {
		this.loadImages();

		this.state.subscribe('menu.isCollapsed', (isCollapsed) => {
			this.isMenuCollapsed = isCollapsed;
		});
		this.state.subscribe('logout', (isOff) => {
			this.auth.logout();
		});
		this.heartbeat.monitor();

	}

	public ngAfterViewInit(): void {
		// hide spinner once all loaders are completed
		ThemePreloader.load().then((values) => {
			this.spinner.hide();
		});
	}

	private ngOnDestroy():void {
		this.heartbeat.monitor('exit');

	}

	private loadImages(): void {
		// register some loaders
		ThemePreloader.registerLoader(this.imageLoader.load(layoutPaths.images.root + 'sky-bg.jpg'));
	}
}

// if('serviceWorker' in navigator){
//     // Handler for messages coming from the service worker
//     navigator.serviceWorker.addEventListener('message', function(event){
//         console.log("Client Received Message: " + event.data);
//         event.ports[0].postMessage("Client Received Message: " + event.data);
//     });
// }
