// Load the implementations that should be tested
import { FormDesignerComponent } from './form-designer.component';
import { QuestionBase } from '../model';
import { QuestionControlService } from '../question-control.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { DropdownQuestion } from '../components/question-dropdown';
import { TextboxQuestion } from '../components/question-textbox';

describe('FormDesignerComponent', () => {
	const qcs = new QuestionControlService();
//	const modalStack = new NgbModalStack();
	const modal =  new NgbModal(null)
  	let QuestionState: QuestionBase<any>[] = [];
	const dfc =  new FormDesignerComponent(qcs, modal)
	let qb:QuestionBase<any>[] = [
	new DropdownQuestion({
		key: 'brave',
		label: 'Bravery Rating',
		options: [
		{key: 'solid',  value: 'Solid'},
		{key: 'great',  value: 'Great'},
		{key: 'good',   value: 'Good'},
		{key: 'unproven', value: 'Unproven'}
		],
		order: 3
	}),
	new TextboxQuestion({
		key: 'firstName',
		label: 'First name',
		value: 'tony',
		required: true,
		order: 1
	}),
	new TextboxQuestion({
		key: 'emailAddress',
		label: 'Email',
		type: 'email',
		order: 2
	})
	];

	const dragulaService = {
		dispatch: ()=>{},		
		drop: ()=>{
		  return {subscribe: ()=> {}}
		}		
	}

	// provide our implementations or mocks to the dependency injector
  	beforeEach(() => {

		QuestionState = [
				{
			  		key: '1',
			  		label: 'Test',
			  		value: 'whoooooo',
			  		required: false,
			  		readonly: false,
			  		placeholder: 'false',
			  		order: 1,
			  		controlType: 'cheese',
			  		className: 'false',
			  		group: 17,
			  		groupColumns: 'false',
			  		columns: [],
			  		data: [],
			  		hidden: false,

				}
			];
  	});


	it('should define FormDesignerComponent', () => {
	  	expect(FormDesignerComponent).toBeDefined();
	});
  	it('addGroup', () => {
		let cmp =  new FormDesignerComponent(qcs, modal)
		cmp.addGroup();
		expect(cmp.formDataCopy.length).toBe(1);
		expect(cmp.formDataCopy[0].group).toBe(1);
  	});
  	it('createDynamicForm', () => {
  		QuestionState[0].controlType = 'documents-grid'
		let cmp =  new FormDesignerComponent(qcs, modal)
		const result = cmp.createDynamicForm(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].group).toBe(17);
  	});
	it('should run getQuestionClass - null', () => {
		dfc.questions = qb;
		expect(dfc.getQuestionClass(null, null)).toEqual(undefined);
	});
	it('should run getQuestionClass -  groupClass null, columnClass - bad value', () => {
		dfc.questions = qb;
		expect(dfc.getQuestionClass(null, 'tony')).toEqual(undefined);
	});
	it('should run getQuestionClass -  groupClass null, columnClass - 1-Column', () => {
		dfc.questions = qb;
		expect(dfc.getQuestionClass(null, '1-Column')).toEqual('form-group col-md-12');
	});
	it('should run getQuestionClass -  groupClass null, columnClass - 2-Column', () => {
		dfc.questions = qb;
		expect(dfc.getQuestionClass(null, '2-Column')).toEqual('form-group col-md-6');
	});
	it('should run getQuestionClass -  groupClass null, columnClass - 3-Column', () => {
		dfc.questions = qb;
		expect(dfc.getQuestionClass(null, '3-Column')).toEqual('form-group col-md-4');
	});
	it('should run getQuestionClass -  groupClass bad value, columnClass - null', () => {
		dfc.questions = qb;
		expect(dfc.getQuestionClass('tony', null)).toEqual(undefined);
	});
	it('should run getQuestionClass -  groupClass 1-Column, columnClass - null', () => {
		dfc.questions = qb;
		expect(dfc.getQuestionClass('1-Column', null)).toEqual('form-group col-md-12');
	});
	it('should run getQuestionClass -  groupClass 2-Column, columnClass - null', () => {
		dfc.questions = qb;
		expect(dfc.getQuestionClass('2-Column', null)).toEqual('form-group col-md-6');
	});
	it('should run getQuestionClass -  groupClass 2-Column, columnClass - null', () => {
		dfc.questions = qb;
		expect(dfc.getQuestionClass('3-Column', null)).toEqual('form-group col-md-4');
	});
	it('should run getQuestionClass -  groupClass bad value, columnClass - bad', () => {
		dfc.questions = qb;
		expect(dfc.getQuestionClass('tony', 'tony')).toEqual(undefined);
	});
	it('should run getQuestionClass -  groupClass 1-Column, columnClass - 3-Column', () => {
		dfc.questions = qb;
		expect(dfc.getQuestionClass('1-Column', '3-Column')).toEqual('form-group col-md-4');
	});


});
