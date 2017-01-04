import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, ViewContainerRef, ViewChild, AfterViewInit }  from '@angular/core';
import { CommonModule } from "@angular/common"
import { FormGroup, FormsModule } from '@angular/forms';
import { QuestionBase } from '../model/question-base';
import { QuestionControlService } from '../question-control.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as toastr from 'toastr';
import { DragulaService } from 'ng2-dragula/ng2-dragula';


@Component({
	selector: 'dc-form-designer ',
	styleUrls: ['./form-designer.component.scss'],
	templateUrl: './form-designer.component.html',
	providers: [ QuestionControlService ]
})
export class FormDesignerComponent implements OnInit {

	@Input() questions: Array<any> = [];
	@Input() isMultiColumn: boolean = false;
	@Input() formData: Array<any> = [];
	@Input() title: string;
	@Output() formDesignChanged = new EventEmitter<any>();

  	private closeResult: string;
  	private nextGroupNumber:number = 1;
  	private formDataCopy: Array<any> = [];
  	private questionsCopy: Array<any> = [];
  	private group: number = null;
	private questionMap = new Map<any, any>();
	private groupColumnItems = '1-Column 2-Column 3-Column'.split(' ');
	private groupColumnModel = { options: '1-Column' };

	constructor(private qcs: QuestionControlService, private modalService: NgbModal, private dragulaService: DragulaService) {  }

	ngOnInit() {
	    this.dragulaService.drop.subscribe((value) => {
	      	this.onDrop(value);
	    });

	}

 	private openformDesigner(content, fromGrid?) {
 		//start fresh when called from dynamic form
 		if(!fromGrid){
	 		this.formDataCopy = []; 			
 		}
    	this.modalService.open( content, { backdrop: 'static' } ).result.then((result) => {
      		this.closeResult = `Closed with: ${result}`;
    	}, (reason) => {
      		this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    	});
  	}

  	private onDrop(args) {
    	const [bagName, el, target, source] = args;
    	const dropKey = el.id
    	const children = target.children;
    	const group = target.id;
    	const len = children.length
    	let firstRow = true;
    	//len is 0 if question is being moved into an empty container
    	if(len){
		    for (let i = 0; i < len; i++) {
	        	const key = children[i].id;
	        	if(key){
		        	const value = this.questionMap.get(key);
		        	if(value){
			        	value.order = i;
			        	value.group = group;
			        	//default columns for group
			        	if(firstRow){
			        		if(!value.groupColumns){
				        		value.groupColumns = '1-Column';			        			
			        		}
			        	}else{
			        		value.groupColumns = null;			        		
			        	}
			        	firstRow = false
		        	}
	        	}
	    	}    		
    	}else{
        	const value = this.questionMap.get(dropKey);
        	if(value){
	        	value.order = 0;
	        	value.groupColumns = '1-Column';        		
        	}
    	}
    	//reload form data
		const formDataCopy = this.createDynamicForm(this.getQuestions());
		this.formDataCopy = Object.assign([], formDataCopy);
  	}

	private addGroup(){
		this.formDataCopy.push({
			group: this.nextGroupNumber++,
			fields:[] 
		})
	}

	private openFormSettings(groupId, content){
		console.log(groupId)
		this.group = groupId;
		this.questionsCopy = this.getQuestions(groupId);
			this.questionsCopy.forEach(question => {
				if(question.group && this.nextGroupNumber <= question.group){
					this.nextGroupNumber = question.group + 1
				}
				if(question.groupColumns){
					this.groupColumnModel.options = question.groupColumns;
				}
			})
    	this.modalService.open( content, { backdrop: 'static' } ).result.then((result) => {
      		this.closeResult = `Closed with: ${result}`;
    	}, (reason) => {
      		this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    	});
	}
 
  	private getFormData(){
  		if(!this.formDataCopy.length){
			this.formDataCopy = Object.assign([], this.formData);
			this.questionMap = new Map();
			this.questions.forEach(question => {
				if(question.group && this.nextGroupNumber <= question.group){
					this.nextGroupNumber = question.group + 1
				}
				this.questionMap.set(question.key, question)
			})
  		}
  		return this.formDataCopy;
  	}

	private getQuestions(groupId?){

		//read through the form data and set the orderBy fields
		const reorderedQuestions = [];
		this.questionMap.forEach((val, key)=>{
			if(!groupId){
				reorderedQuestions.push(val);
				return;				
			}
			if(groupId == val.group){
				reorderedQuestions.push(val);				
			}
		})
		// sort by group to get in group order
        let groupedQuestions =  reorderedQuestions.sort( (x, y) => x.group - y.group || x.order - y.order );
		//renumber questions 
	    for (let i = 0; i < groupedQuestions.length; i++) {
        	groupedQuestions[i].order = i;
        }
		return reorderedQuestions;
	}

	private saveForm(){
		this.formDesignChanged.emit(this.getQuestions());
	}

	private saveFormAttributesForGroup(){
		//first key in group will contain the group columns setting
		let firstKey = true;
		//the updated questions have been saved ...
		this.questionsCopy.forEach(question =>{
	    	const value = this.questionMap.get(question.key);
	    	if(!value){
	    		return;
	    	}
	    	if(firstKey){
	    		firstKey = false;
	    		value.groupColumns = this.groupColumnModel.options;
	    	}
	    	value.label = question.label;
	    	value.hidden = question.hidden;
	    	value.placeholder = question.placeholder;
	    	value.className = question.className;			
		})
		const formDataCopy = this.createDynamicForm(this.getQuestions());
		this.formDataCopy = Object.assign([], formDataCopy);
	}

    private createDynamicForm(groupedQuestions: QuestionBase<any>[]){
    	//FIXME???? needs to be in a util - used in 2 places!!
        const formData = [];
        const groups = {};
        //create form sections from the sorted questions
        groupedQuestions.forEach(question =>{
            //create a card for the first item
           if (question.groupColumns){
                groups[question.group] = { group: question.group, groupColumns: question.groupColumns, fields:[] };
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
				return 'col-md-12';
			}
			if(columnClass == '2-Column'){
				return 'col-md-6';
			}
			if(columnClass == '3-Column'){
				return 'col-md-4';
			}
		}
		if (groupClass){
			if(groupClass == '1-Column'){
				return 'col-md-12';
			}
			if(groupClass == '2-Column'){
				return 'col-md-6';
			}
			if(groupClass == '3-Column'){
				return 'col-md-4';
			}
		}

	}

  	private getDismissReason(reason: any): string {
  		console.log(reason)
    	if (reason === ModalDismissReasons.ESC) {
      		return 'by pressing ESC';
    	} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      		return 'by clicking on a backdrop';
    	} else {
      		return  `with: ${reason}`;
    	}
  	}
}



