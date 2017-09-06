import { QuestionBase } from '../model/question-base';

export class WeatherUndergroundQuestion extends QuestionBase<string> {
	controlType = 'weather-underground';
	type: string;

	constructor(options: {} = {}) {
		super(options);
		this.type = options['type'] || '';
	}
}
