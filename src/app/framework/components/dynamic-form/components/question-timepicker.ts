import { QuestionBase } from '../model/question-base';

export class TimeQuestion extends QuestionBase<string> {
	controlType = 'time';
	type: string;

	constructor(options: {} = {}) {
		super(options);
		this.type = options['type'] || '';
	}
}
