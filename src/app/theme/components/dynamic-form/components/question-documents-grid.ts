
import { QuestionBase } from '../model/question-base';

export class DocumentsGridQuestion extends QuestionBase<string> {
	controlType = 'documents-grid';
	columns: {key: string, label: string}[] = [];
	data: {}[] = [];
	options: {} = {};

	constructor(options: {} = {}) {		
		super(options);
		this.columns = options['columns'];
		this.data = options['data'];

	}
}