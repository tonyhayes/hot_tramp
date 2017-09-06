import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class WeatherActions {
    static LOAD_WEATHER_UNDERGROUND = 'Load weather underground';
    loadWeatherUnderground(location): Action {
        return {
            type: WeatherActions.LOAD_WEATHER_UNDERGROUND,
            payload: location.coords
        };
    }
    static LOAD_WEATHER_DARKSKY = 'Load weather darksky';
    loadWeatherDarksky(location): Action {
        return {
            type: WeatherActions.LOAD_WEATHER_DARKSKY,
            payload: location.coords
        };
    }

    static LOAD_WEATHER_SUCCESS = 'Load weather Success';
    loadWeatherSuccess(weather): Action {
        return {
            type: WeatherActions.LOAD_WEATHER_SUCCESS,
            payload: weather
        };
    }
    static LOAD_WEATHER_FAILURE = 'Load weather Failure';
    loadWeatherFailure(weather): Action {
        return {
            type: WeatherActions.LOAD_WEATHER_FAILURE,
            payload: weather
        };
    }


}