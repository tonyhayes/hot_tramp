export class QuestionBase<T>{
	value: T;
	key: string;
	label: string;
	required: boolean;
	readonly: boolean;
	placeholder: string;
	order: number;
	controlType: string;
	constructor(options: {
		value?: T,
		key?: string,
		label?: string,
		required?: boolean,
		readonly?: boolean,
		placeholder?: string,
		order?: number,
		controlType?: string
	} = {}, 
	columns: {
		key?: string,
		label?: string,
		controlType?: string
	} = {}, 
	data: {
	} = {}) {
		this.value = options.value;
		this.key = options.key || columns.key || '';
		this.label = options.label || columns.label || '';
		this.required = !!options.required;
		this.readonly = !!options.readonly;
		this.placeholder = options.placeholder || 'Select...';
		this.order = options.order === undefined ? 1 : options.order ;
		this.controlType = options.controlType || '';
	}
}
