import { QuestionBase } from '../model/question-base';

export class GridQuestion extends QuestionBase<string> {
	controlType = 'grid';
	columns: {key: string, label: string}[] = [];
	data: {}[] = [];

	constructor(data) {		
		super(data.options, data.columns, data.data);
		this.columns = data.columns || [];
		this.data = data.data || [];
	}
}