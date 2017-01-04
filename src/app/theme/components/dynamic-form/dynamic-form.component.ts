import { Component, Input, OnInit, Output, EventEmitter  }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionBase }              from './model/question-base';
import { QuestionControlService }    from './question-control.service';
@Component({
	selector: 'dynamic-form',
	styleUrls: ['./dynamic-form.component.scss'],
	templateUrl: './dynamic-form.component.html',
	providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

	@Input() questions: QuestionBase<any>[] = [];
	@Input() isMultiColumn: boolean = false;
	@Input() formData: {};
	@Input() title: string;
	@Output() submitForm = new EventEmitter<any>();
	@Output() questionsChanged = new EventEmitter<any>();

	private form: FormGroup;
	private payLoad = '';


	constructor(private qcs: QuestionControlService) {  }

	ngOnInit() {
		this.form = this.qcs.toFormGroup(this.questions);
	}

	formDesignChanged(questions){
		this.questionsChanged.emit(questions);
	}

	getQuestionClass(groupClass, columnClass, key):string {
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

	onSubmit() {
		this.payLoad = JSON.stringify(this.form.value);
		this.submitForm.emit(this.form.value);
	}
}
