import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase }     from '../model/question-base';
@Component({
  	moduleId: module.id,
	selector: 'df-question',
	templateUrl: 'dynamic-form-question.component.html',
  	styleUrls: ['dynamic-form-question.component.scss'],
})
export class DynamicFormQuestionComponent {
	@Input() question: QuestionBase<any>;
	@Input() form: FormGroup;
	get isValid() { return this.form.controls[this.question.key].valid; }

	dynamicFormOptionSelection(questionId, selectedItemValue){
		this.form.patchValue({[questionId]: selectedItemValue});
	}
	dynamicFormOptionSelected(question) :string{
		return this.form.controls[question.key].value || 'Select: '+ question.label;
	}

}
