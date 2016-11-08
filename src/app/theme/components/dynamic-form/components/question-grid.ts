import { QuestionBase } from '../model/question-base';

export class GridQuestion extends QuestionBase<string> {
	controlType = 'grid';
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