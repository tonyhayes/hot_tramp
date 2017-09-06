import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { WeatherActions } from '../actions';
import { WeatherService } from '../services';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
@Injectable()
export class WeatherEffects {
    constructor (
        private update$: Actions,
        private actions: WeatherActions,
        private svc: WeatherService
    ) {}


    @Effect() loadWeatherUnderground$ = this.update$
        .ofType(WeatherActions.LOAD_WEATHER_UNDERGROUND)
        .switchMap((location) => this.svc.getCurrentWeatherUnderground(location))
        .map(weather => this.actions.loadWeatherSuccess(weather))
        .catch(error => Observable.of(this.actions.loadWeatherFailure(error)))

}