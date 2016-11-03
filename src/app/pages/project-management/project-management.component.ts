import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup }       						from '@angular/forms';

import { QuestionService } 						from './question.service';
import { Observable } from 'rxjs/Observable';



@Component({
	moduleId: module.id,
	selector: 'project-management',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ 'project-management.component.scss' ],
	templateUrl: 'project-management.component.html',
//  	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ProjectManagement implements OnInit {


	public submitted:boolean = false;
	public errorMessage:string;
	public questions: any[];

	constructor(private service: QuestionService) {}
	ngOnInit() {
		this.getQuestions();		
	}

	public getQuestions():void {
		this.service.getQuestions()
						.subscribe(
							questions => this.questions = questions,
							error =>  this.errorMessage = <any>error);
	}

	public onSubmit(values:FormGroup):void {
		console.log(JSON.stringify(values));
	}


}
