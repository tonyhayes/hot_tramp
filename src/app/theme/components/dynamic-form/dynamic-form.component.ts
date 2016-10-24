import { Component, Input, OnInit, Output, EventEmitter  }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionBase }              from './model/question-base';
import { QuestionControlService }    from './question-control.service';
@Component({
  	moduleId: module.id,
	selector: 'dynamic-form',
  	styleUrls: ['dynamic-form.component.scss'],
	templateUrl: 'dynamic-form.component.html',
	providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {
	@Input() questions: QuestionBase<any>[] = [];
	@Output() submitForm = new EventEmitter<any>();
	form: FormGroup;
	payLoad = '';
	constructor(private qcs: QuestionControlService) {  }

	ngOnInit() {
		this.form = this.qcs.toFormGroup(this.questions);
	}

	onSubmit() {
		this.payLoad = JSON.stringify(this.form.value);
		this.submitForm.emit(this.form.value);
	}
}
