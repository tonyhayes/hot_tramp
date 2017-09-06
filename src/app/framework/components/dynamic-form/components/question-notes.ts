import { QuestionBase } from '../model/question-base';

export class NotesQuestion extends QuestionBase<string> {
	controlType = 'notes';
	type: string;

	constructor(options: {} = {}) {
		super(options);
		this.type = options['type'] || '';
	}
}
