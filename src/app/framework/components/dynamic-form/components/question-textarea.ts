import { QuestionBase } from '../model/question-base';

export class TextareaQuestion extends QuestionBase<string> {
	controlType = 'textarea';
	type: string;

	constructor(options: {} = {}) {
		super(options);
		this.type = options['type'] || '';
	}
}
