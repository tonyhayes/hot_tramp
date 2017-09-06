import { QuestionBase } from '../model/question-base';

export class SignatureQuestion extends QuestionBase<string> {
	controlType = 'signature';
	type: string;

	constructor(options: {} = {}) {
		super(options);
		this.type = options['type'] || '';
	}
}
