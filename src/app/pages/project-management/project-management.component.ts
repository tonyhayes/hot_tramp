import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup }       						from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/let';
import { ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionActions } from '../../actions';
import { AppState } from '../../reducers';

@Component({
	selector: 'project-management',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './project-management.component.scss' ],
	templateUrl: './project-management.component.html',
//  	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ProjectManagement implements OnInit {

	public questionList: Observable<any>;
	public questionListClone: Observable<any>;
	public componentQuestions: Observable<any>;

	public submitted:boolean = false;
  	private anyErrors: boolean;
  	public finished: boolean;

	constructor( private questionActions: QuestionActions, private questionStore: Store<AppState> ) {}
	ngOnInit() {
		this.getForm();		
	}

	public getForm():void {

		this.questionStore.dispatch(this.questionActions.loadQuestions('/api/projectmanagement/1'));
		this.componentQuestions = this.questionStore.select('questions');
	    this.componentQuestions.subscribe(
	        value => {
	        	if(value.length){
					this.questionStore.dispatch(this.questionActions.loadFormQuestions('/api/projectmanagement/1'));
					this.questionList = this.questionStore.select('formQuestions');
					this.questionList.subscribe(v => console.log(v));
	        		this.finished = true
	        	}
	        },
	        error => this.anyErrors = true,
	        
	    );
	}

	public onSubmit(values:FormGroup):void {
		console.log(JSON.stringify(values));
	}
	public questionsChanged(questions):void {
		this.questionStore.dispatch(this.questionActions.saveQuestions('/api/projectmanagement/1', questions));
	}


}
