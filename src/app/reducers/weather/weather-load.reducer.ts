import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { WeatherActions } from '../../actions';

export type LoadWeatherState = any[];

const initialState: any[] = [];

export const loadWeatherReducer = function (state = initialState, action: Action): any[] {
	switch (action.type) {
		case WeatherActions.LOAD_WEATHER_SUCCESS: {
			return action.payload;
		}
		case WeatherActions.LOAD_WEATHER_FAILURE: {
			return action.payload;
		}
		default: {
			return state;
		}
	}
}