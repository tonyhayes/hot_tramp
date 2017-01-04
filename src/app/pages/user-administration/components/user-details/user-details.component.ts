import { Component, ViewEncapsulation, ElementRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';

import { ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionActions } from '../../../../actions';
import { AppState } from '../../../../reducers';

@Component({
	selector: 'user-details',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ './user-details.component.scss' ],
	templateUrl: './user-details.component.html',
//  	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UserDetails implements OnInit {

	private questionList: Observable<any>;
	private questionListClone: Observable<any>;
	private componentQuestions: Observable<any>;

	private submitted:boolean = false;
  	private anyErrors: boolean;
  	private isAdminPage: boolean = true;
  	private finished: boolean;
	private homeRoute: string = '/user-administration/user-list';
	private endPoint:string = '/api/projectmanagement/1'

	constructor(private questionActions: QuestionActions, private questionStore: Store<AppState>, private el : ElementRef ) {}

	ngOnInit() {
		this.getForm();		
	}

  	ngAfterViewInit() {
    	const contentTop = this.el.nativeElement.offsetParent.children[0].nodeName;
    	console.log('contentTop: '+contentTop)
    	if(contentTop == 'DC-CONTENT-TOP'){
    		this.isAdminPage = false;
    	}
  	}

	private getForm():void {

		this.questionStore.dispatch(this.questionActions.loadQuestions(this.endPoint));
		this.componentQuestions = this.questionStore.select('questions');
	    this.componentQuestions.subscribe(
	        value => {
	        	if(value.length){
					this.questionStore.dispatch(this.questionActions.loadFormQuestions(this.endPoint));
					this.questionList = this.questionStore.select('formQuestions');
					this.questionList.subscribe(v => console.log(v));
	        		this.finished = true
	        	}
	        },
	        error => this.anyErrors = true,
	        
	    );
	}

	private onSubmit(values:FormGroup):void {
		console.log(JSON.stringify(values));
	}

	private questionsChanged(questions):void {
		this.questionStore.dispatch(this.questionActions.saveQuestions(this.endPoint, questions));
	}


}
