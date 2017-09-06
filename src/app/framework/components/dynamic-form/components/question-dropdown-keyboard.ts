import { QuestionBase } from '../model/question-base';

export class DropdownKeyboardQuestion extends QuestionBase<string> {
	controlType = 'dropdown-keyboard';
	options: {key: string, value: string}[] = [];

	constructor(options: {} = {}) {
		super(options);
		this.options = options['options'] || [];
	}

}
