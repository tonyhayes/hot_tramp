import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http, Headers, RequestOptions }          from '@angular/http';
import { GlobalState } from '../global.state';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/observable/of';

@Injectable()
export class WeatherService {

	portlandUrl: string = 'OR/Portland.json';

	constructor (private http: Http, private state: GlobalState) {}

	getDarkSkyUrl(): string {
        return this.state.getCurrent('app.API_DARKSKY_URL');
	}
	getWeatherUndergroundUrl(): string {
        return this.state.getCurrent('app.API_WEATHER_UNDERGROUND_URL');
	}

	getCurrentWeatherDarkSky(location): Observable<any[]> {
//https://revolution-api.dexchadev.com/dev/darksky/45.51184,-122.6668962
	console.log(location)
		return this.http.get(`${this.getDarkSkyUrl()}${location.payload.latitude},${location.payload.longitude}`)
			.map(res => res.json())
			.map((weather) => {
				return weather
			})
			.catch(error => {
				console.log('catch')
				return Observable.of(error.json())
			})
	}
	getCurrentWeatherUnderground(location): Observable<any[]> {
//https://revolution-api.dexchadev.com/dev/darksky/45.51184,-122.6668962
	console.log(location)
//		return this.http.get(`${this.getWeatherUndergroundUrl()}${location.payload.latitude},${location.payload.longitude}.jon`)
		return this.http.get(`${this.getWeatherUndergroundUrl()}${this.portlandUrl}`)
			.map(res => res.json())
			.map((weather) => {
				return weather
			})
			.catch(error => {
				console.log('catch')
				return Observable.of(error.json())
			})
	}

}
