import { QuestionBase } from '../model/question-base';

export class TextlineQuestion extends QuestionBase<string> {
	controlType = 'textline';
	type: string;

	constructor(options: {} = {}) {
		super(options);
		this.type = options['type'] || '';
	}
}
