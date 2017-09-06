import { QuestionBase } from '../model/question-base';

export class TagSelectQuestion extends QuestionBase<string> {
	controlType = 'tag';
	options: {key: string, value: string}[] = [];

	constructor(options: {} = {}) {
		super(options);
		this.options = options['options'] || [];
	}
}