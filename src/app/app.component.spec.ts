import {
  inject,
  TestBed
} from '@angular/core/testing';

// Load the implementations that should be tested
import { App } from './app.component';
import { AppState } from './app.service';
import { GlobalState } from './global.state';
import { ImageLoaderService, ThemePreloader, ThemeSpinner } from './theme/services';
import { HeartbeatService } from './theme/services/http-api/heartbeat.service';
import { ThemeConfig } from './theme/theme.config';
import { ThemeConfigService } from './theme/theme.config.service';
import { Auth } from './auth.service';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      	AppState,
      	App,
      	GlobalState,
      	ImageLoaderService, ThemePreloader, ThemeSpinner,
      	HeartbeatService, ThemeConfig, ThemeConfigService,
      	Auth
    ]}));

	it('should maintain a global state', inject([ App, GlobalState,  ImageLoaderService, ThemeSpinner, ThemeConfig, HeartbeatService, Auth], (app) => {
		console.log(app.state);
		expect(app.state).toBeDefined();
		expect(app.state.data).toBeDefined();
		expect(app.state.dataStream$).toBeDefined();
		expect(app.state.subscriptions).toBeDefined();
	}));
	it('should have isMenuCollapsed = false', inject([ App, GlobalState,  ImageLoaderService, ThemeSpinner, ThemeConfig, HeartbeatService, Auth], (app) => {
		console.log(app);
		expect(app.imageLoader).toBeDefined();
		expect(app.spinner).toBeDefined();
		expect(app.isMenuCollapsed).toBeDefined();
		expect(app.isMenuCollapsed).toEqual(false);
	}));

});