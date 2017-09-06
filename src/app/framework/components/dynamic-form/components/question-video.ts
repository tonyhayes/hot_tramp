import { QuestionBase } from '../model/question-base';

export class VideoQuestion extends QuestionBase<string> {
	controlType = 'video';
	type: string;

	constructor(options: {} = {}) {
		super(options);
		this.type = options['type'] || '';
	}
}
