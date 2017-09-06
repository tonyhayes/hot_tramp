import { Component, Input, OnInit, Output, EventEmitter, OnDestroy }  from '@angular/core';
import { CommonModule } from "@angular/common"
import { FormGroup, FormsModule } from '@angular/forms';
import { QuestionBase } from '../model/question-base';
import { QuestionControlService } from '../question-control.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as toastr from 'toastr';
import * as _ from 'lodash';
import { TranslateService } from '../../../../translate';

var self
@Component({
	selector: 'dc-form-designer ',
	styleUrls: ['./form-designer.component.scss'],
	templateUrl: './form-designer.component.html',
	providers: [ QuestionControlService ]
})
export class FormDesignerComponent  {

	@Input() questions: QuestionBase<any>[] = [];
	@Input() isMultiColumn: boolean = false;
	@Input() formData: Array<any> = [];
	@Input() formGroup: FormGroup;
	@Input() title: string;
	@Output() formDesignChanged = new EventEmitter<any>();

   	closeResult: string;
   	nextGroupNumber:number = 1;
   	formDataCopy: Array<any> = [];
   	formDataSaveCopy: Array<any> = [];
   	formDataSaveCopyBeforeAdd: Array<any> = [];
  	group: number = null;
	groupColumnItems = '1-Column 2-Column 3-Column'.split(' ');
	groupColumnModel = { options: '1-Column', title: '' };
//	settings = false;  
	page = 1;  
   	dragOperation: boolean = false;
	dialogTitle = ''
	dialogBody = ''
	formSection
	formComponents = [
			{key: 'BsDropdownQuestion', value: 'Dropdown', controlType: 'bs-dropdown'},
			{key: 'CheckboxQuestion', value: 'Checkbox', controlType: 'checkbox'},
			{key: 'DatalistQuestion', value: 'Datalist', controlType: 'datalist'},
			{key: 'DateQuestion', value: 'Date', controlType: 'date'},
			{key: 'DropdownKeyboardQuestion', value: 'Dropdown - Keyboard', controlType: 'dropdown-keyboard'},
			{key: 'DropdownQuestion', value: 'Dropdown - not bootstrap', controlType: 'dropdown'},
			{key: 'InputQuestion', value: 'Input', controlType: 'input'},
			{key: 'NotesQuestion', value: 'Notes', controlType: 'notes'},
			{key: 'PhotoQuestion', value: 'Photo', controlType: 'photo'},
			{key: 'PhotosQuestion', value: 'Photo - multiple', controlType: 'photos'},
			{key: 'RadioQuestion', value: 'Radio', controlType: 'radio'},
			{key: 'SignatureQuestion', value: 'Signature', controlType: 'signature'},
			{key: 'TagSelectQuestion', value: 'Tag Select', controlType: 'tag'},
			{key: 'TextareaQuestion', value: 'Textarea', controlType: 'textarea'},
			{key: 'TextboxQuestion', value: 'Textbox', controlType: 'textbox'},
			{key: 'TextlineQuestion', value: 'Textline', controlType: 'textline'},
			{key: 'TimeQuestion', value: 'Time', controlType: 'time'},
			{key: 'WeatherUndergroundQuestion', value: 'Weather Underground', controlType: 'weather-underground'},
	]
	newFiledAddr = 0;

	constructor(private qcs: QuestionControlService, private modalService: NgbModal, private translate: TranslateService) {  }

	ngOnInit() {}

 	openformDesigner(content, fromGrid?) {
 		//start fresh when called from dynamic form
 		if(!fromGrid){
	 		this.formDataCopy = []; 			
 		}
    	this.modalService.open( content, { backdrop: 'static', size: 'lg' } ).result.then((result) => {
      		this.closeResult = `Closed with: ${result}`;
    	}, (reason) => {
      		this.closeResult = `Dismissed`;
    	});
  	}


	addGroup(){
		this.formDataCopy.push({
        	groupTitle: this.nextGroupNumber,
			group: this.nextGroupNumber++,
        	groupColumns: '1-Column', 
            groupListStyle: false, 
			fields:[] 
  		})
	}
	openFormSettings(groupId, content){
		console.log(groupId)
		this.group = groupId;
		this.formDataSaveCopy = _.cloneDeep(this.formDataCopy);
		this.page = 2
	}
 
  	getFormData(){
  		if(!this.formDataCopy.length){
			this.formDataCopy = _.cloneDeep(this.formData);
			this.questions.forEach(question => {
				if(question.group && this.nextGroupNumber <= question.group){
					this.nextGroupNumber = question.group + 1
				}
			})
  		}
  		return this.formDataCopy;
  	}

	saveForm(){
		//read through the form data and set the orderBy fields
		const reorderedQuestions: QuestionBase<any>[] = [];
		let k = 1
		this.formDataCopy.forEach(formSection =>{
			formSection.fields.forEach((question: QuestionBase<any>, idx) =>{
				if(idx == 0){
		        	question.groupTitle = formSection.groupTitle;
					question.group = formSection.group;
		        	question.groupColumns = formSection.groupColumns; 
		            question.groupListStyle = formSection.groupListStyle;		            
				}else{
		        	question.groupTitle = null;
					question.group = null;
		        	question.groupColumns = null ;
		            question.groupListStyle = null; 
				}
				question.order = k++;

				reorderedQuestions.push(question);				
			})
		})
		this.formDesignChanged.emit(reorderedQuestions);
	}

	saveFormAttributesForGroup(){
		this.page = 1
	}
	closeFormAttributesForGroup(){
		this.formDataCopy = _.cloneDeep(this.formDataSaveCopy);
		this.page = 1
	}
	saveAddFormAttributesForGroup(){
		this.page = 2
	}
	closeAddFormAttributesForGroup(){
		this.formDataCopy = _.cloneDeep(this.formDataSaveCopyBeforeAdd);
		this.page = 2
	}
	onAdd(formSection){
		this.formDataSaveCopyBeforeAdd = _.cloneDeep(this.formDataCopy);
		this.formSection = formSection;
		this.page = 3
	}
	onDelete(formSection, item){
		for (let i = formSection.fields.length - 1; i >= 0; i--) {
		    if (formSection.fields[i].key == item.key) { 
		        formSection.fields.splice(i, 1);
		    }
		}
	}
	onSelect(formSection, item){
		// turn item into a question
		/* assuming that window.crypto.getRandomValues is available */

		const array = new Uint32Array(1);
		window.crypto.getRandomValues(array);

		const random = array[0];
		let questions = [
			{
                key: item.value + random,
                baseKey: item.value + random,
                label: item.value,
                order: 999,
                value: null,
                controlType: item.controlType,
			},
		]
		const newItem = this.qcs.createDynamicFormComponent(questions)[0];
		this.formDataCopy.forEach(formSection =>{
			if (formSection.group == this.group){
				formSection.fields.push(newItem);				
				const control = this.qcs.addToFormGroup(newItem)
				this.formGroup.addControl(newItem['key'], control);
			}
		})

		this.page = 2;
	}
    createDynamicForm(groupedQuestions: QuestionBase<any>[]){
    	//FIXME???? needs to be in a util - used in 2 places!!
        const formData = [];
        const groups = {};
        //create form sections from the sorted questions
        groupedQuestions.forEach((question: QuestionBase<any>) =>{
            //create a card for the first item
           if (question.groupColumns || question.groupListStyle){
                groups[question.group] = { 
                	group: question.group, 
                	groupColumns: question.groupColumns || '1-Column', 
                	groupTitle: question.groupTitle,
                    groupListStyle: question.groupListStyle, 
                	fields:[] 
                };
            }
            groups[question.group].fields.push(question);
        });
        Object.keys(groups).forEach( (key) => {
            let group = groups[key];
            formData.push(group);
        })
        return formData;
    }
	getQuestionClass(groupClass, columnClass):string {
    	//FIXME???? needs to be in a util - used in 2 places!!
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

}



