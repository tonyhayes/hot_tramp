import { QuestionBase } from '../model/question-base';

export class PhotosQuestion extends QuestionBase<string> {
	controlType = 'photos';
	type: string;

	constructor(options: {} = {}) {
		super(options);
		this.type = options['type'] || '';
	}
}
