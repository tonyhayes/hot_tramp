import { QuestionBase } from '../model/question-base';

export class GridSmartQuestion extends QuestionBase<string> {
	controlType = 'smart-grid';
	columns: {key: string, label: string}[] = [];
	data: {}[] = [];
	options: {} = {};

	constructor(options: {} = {}) {		
		super(options);
		this.columns = options['columns'];
		this.data = options['data'];

	}
}

