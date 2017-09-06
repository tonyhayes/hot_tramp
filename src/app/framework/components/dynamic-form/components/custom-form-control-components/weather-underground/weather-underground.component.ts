import { Component, Input, forwardRef } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { WeatherActions } from '../../../../../../actions';
import { AppState } from '../../../../../../reducers';
import { WeatherService } from '../../../../../../services';

@Component({
	selector: 'dc-weather-underground',
	templateUrl: './weather-underground.component.html',
	styleUrls: ['./weather-underground.component.scss'],
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => WeatherUndergroundComponent), multi: true },
	]
})

export class WeatherUndergroundComponent {

	@Input() question;
	@Input() form: FormGroup;
	_observation;
    weatherReport: Observable<any>;
	propagateChange: any = () => { };

	constructor(private weatherActions: WeatherActions, private weatherStore: Store<AppState>,private weatherService: WeatherService) {}
	get observation(): any {
		return this._observation;
	}

	set observation(value: any) {
		this._observation = value;
		console.log('set observation to ' + this._observation);
		this.propagateChange(this.observation);
	}

	writeValue(value: any): void {
		if (!value) {
			return;
		}
		this.observation = value;
	}

	registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}

	registerOnTouched(): void {
		// no-op
	}


	ngOnInit(){
		if(this.question.value){
			this.observation = this.question.value;
		}
		this.getWeatherReport();
	}

 	onObservation() {
 		//send action for weather report
    	if (navigator.geolocation) {
        	navigator.geolocation.getCurrentPosition(position =>{
	        	this.weatherStore.dispatch(this.weatherActions.loadWeatherUnderground(position));        		
        	});
    	} else { 
        	this.observation = 'Geolocation is not supported by your browser'
     	}

 	}

    getWeatherReport():void {
        this.weatherReport = this.weatherStore.select('loadWeather');
        this.weatherReport.subscribe(
            weatherReport => {
                if(weatherReport && weatherReport.response){
                    this.observation = weatherReport;
                }  
            },
            error => {
            }

        );
    }



	saveValue() {
		this.form.patchValue({ [this.question.key]:this.observation});
		this.question.value = this.observation;

	}	

}