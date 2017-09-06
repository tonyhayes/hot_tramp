import { QuestionBase } from '../model/question-base';

export class CheckboxQuestion extends QuestionBase<string> {
	controlType = 'checkbox';
	type: string;

	constructor(options: {} = {}) {
		super(options);
		this.type = options['type'] || '';
	}
}
