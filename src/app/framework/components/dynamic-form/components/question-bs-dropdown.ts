import { QuestionBase } from '../model/question-base';

export class BsDropdownQuestion extends QuestionBase<string> {
	controlType = 'bs-dropdown';
	options: {key: string, value: string}[] = [];

	constructor(options: {} = {}) {
		super(options);
		this.options = options['options'] || [];
	}

}
