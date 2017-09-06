import { Component, Input, OnInit, Output, EventEmitter }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionBase }              from './model/question-base';
import { QuestionControlService }    from './question-control.service';
import * as _ from 'lodash';
@Component({
	selector: 'dynamic-form',
	styleUrls: ['./dynamic-form.component.scss'],
	templateUrl: './dynamic-form.component.html',
	providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

	@Input() questionList = [];
	@Input() adminMode: boolean = true;
	@Input() cardMode: any = true;
	@Input() readOnly: boolean = false;
	@Input() listStyle: boolean = false;
	@Input() requiredIndicator: boolean = true;
	@Input() title: string;
	@Output() submitForm = new EventEmitter<any>();
	@Output() cancelForm = new EventEmitter<any>();
	@Output() questionsChanged = new EventEmitter<any>();

	formList: FormGroup[] = [];
	questions: QuestionBase<any>[] = []
	formData


	constructor(private qcs: QuestionControlService) {  }

	ngOnInit() {
		this.createForm();
	}
	ngOnChanges(changes:any):void {
		if(!changes.questionList.firstChange){
			this.createForm();
		}
    }
    createForm(){
		const list = this.qcs.createDynamicFormComponent(this.questionList)
		this.questions = this.qcs.groupDynamicFormComponents(list);
		this.formData = this.qcs.createDynamicForm(this.questions);

		this.formList = [];
		this.formList.push(this.qcs.toFormGroup(this.questions));

    }
	formDesignChanged(questions){
		this.questionsChanged.emit(questions);
	}

	getQuestionClass(groupClass, columnClass):string {
		if(!groupClass && !columnClass){
			return;
		}
		//do columns first
		if (columnClass){
			if(columnClass == '1-Column'){
				return 'form-group col-md-12';
			}
			if(columnClass == '2-Column'){
				return 'form-group col-md-6';
			}
			if(columnClass == '3-Column'){
				return 'form-group col-md-4';
			}
		}
		if (groupClass){
			if(groupClass == '1-Column'){
				return 'form-group col-md-12';
			}
			if(groupClass == '2-Column'){
				return 'form-group col-md-6';
			}
			if(groupClass == '3-Column'){
				return 'form-group col-md-4';
			}
		}

	}

	onAdd() {
		this.formList.push(this.qcs.toFormGroup(this.questions));
	}
	onAddGroup(form, formSection) {
		console.log(formSection);
		const newGroup = _.cloneDeep(formSection.fields);
//		let lastKeyValue = newGroup[newGroup.length-1]['key'];
		let lastBaseValueAddr = newGroup[newGroup.length-1]['baseValueAddr'];
		newGroup.forEach((field, idx) =>{
			const keyValue = field['key'];
			const baseValue = field['baseKey'];
			if(baseValue != keyValue){
				return;
			}
			field['value'] = null;
			if(!lastBaseValueAddr){
				field['baseValueAddr'] = '_1_';
				field['key'] = keyValue +'_1_'
			}else{
				field['baseValueAddr'] = lastBaseValueAddr + '_1_';
				field['key'] = keyValue + lastBaseValueAddr + '_1_'
				
			}
			if(idx == 0){
				field['allowDelete'] = true; 				
			} 
			formSection.fields.push(field);
			const control = this.qcs.addToFormGroup(field)
			form.addControl(field['key'], control);

		})
	}
	onDeleteGroup(form, formSection, question) {

		let idx = formSection.fields.length
		while (idx--) {
			const field = formSection.fields[idx];
			if(!field['baseValueAddr']){
				return;
			}
			if(field['baseValueAddr'] == question['baseValueAddr']){
				formSection.fields.splice(idx, 1);
				form.removeControl(field['key']);				
			}

		}
	}
	onDelete(form, idx) {
		this.formList.splice( idx, 1 );
	}
	onCancel() {
		this.cancelForm.emit('cancel');
	}
	areFormsValid() {
		return this.formList.every(form => form.valid);
	}
	onEnter() {
		if(this.formList.every(form => form.valid)){
			this.onSubmit();
		}
	}
	onSubmit() {
		if(this.listStyle){
			//aggregate form values
			const formValues = [];
			this.formList.forEach(form =>{
				formValues.push(form.value)
			})			
			this.submitForm.emit(formValues);
		}else{
			this.submitForm.emit(this.formList[0].value);
		}
	}
}
