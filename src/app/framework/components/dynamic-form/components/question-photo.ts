import { QuestionBase } from '../model/question-base';

export class PhotoQuestion extends QuestionBase<string> {
	controlType = 'photo';
	type: string;

	constructor(options: {} = {}) {
		super(options);
		this.type = options['type'] || '';
	}
}
