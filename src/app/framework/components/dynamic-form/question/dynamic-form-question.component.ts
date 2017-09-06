import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase }     from '../model/question-base';
@Component({
	selector: 'df-question',
	templateUrl: './dynamic-form-question.component.html',
	styleUrls: ['./dynamic-form-question.component.scss'],
})
export class DynamicFormQuestionComponent {
	@Input() question: QuestionBase<any>;
	@Input() requiredIndicator: boolean = true;
	@Input() readOnly: boolean = false;
	@Input() form: FormGroup;
	@Input() columns: string;
	isDateValid = false;

	get isValid() { 
		return this.form.controls[this.question.key].valid; 
	}
	get isTouched() { 
		return this.form.controls[this.question.key].touched; 
	}
	get isPristine() { 
		return this.form.controls[this.question.key].pristine || !this.form.controls[this.question.key].value; 
	}

	constructor(private cdRef:ChangeDetectorRef) {  }

	dynamicFormOptionSelection(questionId, selectedItemValue){
		this.form.patchValue({[questionId]: selectedItemValue});
	}
	hasValidDate(question){
		if(!question.required){
			return true
		}
		if(this.form.controls[this.question.key].value.hasOwnProperty('date')){
			return false
		}
		if(this.form.controls[this.question.key].errors){
			return false
		}
		if(this.form.controls[this.question.key].value){
			//slight bug in that an invalid date can't seem to be trapped
			return true
		}
	}
}
