export class QuestionBase<T>{
	value: T;
	key: string;
	label: string;
	required: boolean;
	readonly: boolean;
	placeholder: string;
	order: number;
	controlType: string;
	className: string;
	group: number;
	groupColumns: string;
	columns: Array<any>;
	data: Array<any>;
	hidden: boolean;
	constructor(options: {
		value?: T,
		key?: string,
		label?: string,
		required?: boolean,
		readonly?: boolean,
		placeholder?: string,
		order?: number,
		controlType?: string,
		className?: string,
		group?: number,
		groupColumns?: string,
		columns?: Array<any>,
		data?: Array<any>,
		hidden?: boolean;
	} = {}) {
		this.value = options.value;
		this.key = options.key || '';
		this.label = options.label || '';
		this.required = !!options.required;
		this.readonly = !!options.readonly;
		this.placeholder = options.placeholder || 'Select...';
		this.order = options.order === undefined ? 1 : options.order ;
		this.controlType = options.controlType || '';
		this.className = options.className || '';
		this.group = options.group || 0;
		this.groupColumns = options.groupColumns || '';
		this.hidden = !!options.hidden;
		this.columns = options.columns || [];
		this.data = options.data || [];
	}
}
