import { QuestionBase } from '../model/question-base';

export class DocumentsGridQuestion extends QuestionBase<string> {
	controlType = 'documents-grid';
	columns: {key: string, label: string}[] = [];
	data: {}[] = [];
	options: {} = {};

	constructor(data = { options:{}, columns:[], data:[] }) {		
		super(data.options, data.columns, data.data);
		this.columns = data.columns;
		this.data = data.data;
		this.options = data.options;
	}
}