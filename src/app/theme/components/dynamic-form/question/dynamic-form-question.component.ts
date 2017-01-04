import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase }     from '../model/question-base';
@Component({
	selector: 'df-question',
	templateUrl: './dynamic-form-question.component.html',
	styleUrls: ['./dynamic-form-question.component.scss'],
})
export class DynamicFormQuestionComponent {
	@Input() question: QuestionBase<any>;
	@Input() form: FormGroup;
	@Input() columns: string;
	get isValid() { return this.form.controls[this.question.key].valid; }

	dynamicFormOptionSelection(questionId, selectedItemValue){
		this.form.patchValue({[questionId]: selectedItemValue});
	}

}
