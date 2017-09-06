export class QuestionBase<T>{
	value: T;
	key: string;
	//basekey is a copy of the key at creation time
	baseKey: string;
	label: string;
	validators: Array<any>;
	readonly: boolean;
	required: boolean;
	placeholder: string;
	order: number;
	controlType: string;
	type: string;
	className: string;
	group: number;
	groupColumns: string;
	groupTitle: string;
	columns: Array<any>;
	data: Array<any>;
	hidden: boolean;
	dataURL: string;
	html: string;
	text: string;
	maxValue: number;
	minValue: number;
	groupListStyle: boolean;
	constructor(options: {
		value?: T,
		key?: string,
		//basekey is a copy of the key at creation time
		baseKey?: string,
		label?: string,
		validators?: Array<any>,
		readonly?: boolean,
		required?: boolean,
		placeholder?: string,
		order?: number,
		controlType?: string,
		type?: string,
		className?: string,
		group?: number,
		groupColumns?: string,
		groupTitle?: string,
		columns?: Array<any>,
		data?: Array<any>,
		hidden?: boolean;
		dataURL?: string;
		html?: string;
		text?: string;
		maxValue?: number;
		minValue?: number;
		groupListStyle?: boolean;
	} = {}) {
		this.value = options.value;
		this.key = options.key || '';
		//basekey is a copy of the key at creation time
		this.baseKey = options.key || '',
		this.label = options.label || '';
		this.validators = options.validators || [];
		this.readonly = !!options.readonly;
		this.required = !!options.required;
		this.placeholder = options.placeholder || 'Select...';
		this.order = options.order === undefined ? 1 : options.order ;
		this.controlType = options.controlType || '';
		this.type = options.type || '';
		this.className = options.className || '';
		this.group = options.group || 0;
		this.groupColumns = options.groupColumns || '';
		this.groupTitle = options.groupTitle || '';
		this.hidden = !!options.hidden;
		this.hidden = !!options.hidden;
		this.dataURL = options.dataURL || '';
		this.html = options.html || '';
		this.text = options.text || '';
		this.maxValue = options.maxValue || null;
		this.minValue = options.minValue || null;
		this.groupListStyle = !!options.groupListStyle;
		this.data = options.data || [];
	}
}
