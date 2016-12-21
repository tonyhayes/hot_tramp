// Load the implementations that should be tested
import { FormDesignerComponent } from './form-designer.component';
import { QuestionBase } from '../model';
import { QuestionControlService } from '../question-control.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

describe('FormDesignerComponent', () => {
	const qcs = new QuestionControlService();
	const modalStack = new NgbModalStack();
	const modal =  new NgbModal(modalStack)
	const ds = new DragulaService()
  	let QuestionState: QuestionBase<any>[] = [];
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
		let cmp =  new FormDesignerComponent(qcs, modal, ds)
		cmp.addGroup();
		expect(cmp.formDataCopy.length).toBe(1);
		expect(cmp.formDataCopy[0].group).toBe(1);
  	});
  	it('createDynamicForm', () => {
  		QuestionState[0].controlType = 'documents-grid'
		let cmp =  new FormDesignerComponent(qcs, modal, ds)
		const result = cmp.createDynamicForm(QuestionState);
		expect(result.length).toBe(1);
		expect(result[0].group).toBe(17);
  	});
  	it('getDismissReason ESC', () => {
  		QuestionState[0].controlType = 'documents-grid'
		let cmp =  new FormDesignerComponent(qcs, modal, ds)
		const result = cmp.getDismissReason(ModalDismissReasons.ESC);
		expect(result).toBe('by pressing ESC');
  	});
  	it('getDismissReason BACKDROP_CLICK', () => {
  		QuestionState[0].controlType = 'documents-grid'
		let cmp =  new FormDesignerComponent(qcs, modal, ds)
		const result = cmp.getDismissReason(ModalDismissReasons.BACKDROP_CLICK);
		expect(result).toBe('by clicking on a backdrop');
  	});
  	it('getDismissReason other', () => {
  		QuestionState[0].controlType = 'documents-grid'
		let cmp =  new FormDesignerComponent(qcs, modal, ds)
		const result = cmp.getDismissReason('QuestionState');
		expect(result).toBe('with: QuestionState');
  	});


});
// describe('CheckboxEditorComponent', () => {
// 	// provide our implementations or mocks to the dependency injector


// 	it('should define CheckboxEditorComponent', () => {
// 	  	expect(CheckboxEditorComponent).toBeDefined();
// 	});
// 	it('should define params, value with agInit', () => {
// 		const cmp = new CheckboxEditorComponent();
// 		const parms = {
// 			value: 'tony',
// 			comma: ','
// 		}
// 		cmp.agInit(parms);
// 	  	expect(cmp.params.value).toBe('tony');
// 	  	expect(cmp.params.comma).toBe(',');
// 	});
// 	it('should define value, with agInit and getValue', () => {
// 		const cmp = new CheckboxEditorComponent();
// 		const parms = {
// 			value: 'tony',
// 			comma: ','
// 		}
// 		cmp.agInit(parms);
// 	  	expect(cmp.getValue()).toBe('tony');
// 	});


// });