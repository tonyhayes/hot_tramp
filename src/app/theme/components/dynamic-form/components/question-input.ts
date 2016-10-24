import { QuestionBase } from '../model/question-base';

export class InputQuestion extends QuestionBase<string> {
	controlType = 'input';
	type: string;

	constructor(options: {} = {}) {
		super(options);
		this.type = options['type'] || '';
	}
}
