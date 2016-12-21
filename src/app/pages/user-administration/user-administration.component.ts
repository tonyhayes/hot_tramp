import { Component, ViewEncapsulation, ElementRef, OnInit} from '@angular/core';
import { FormGroup }       						from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/let';
import { ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionActions } from '../../actions';
import { AppState } from '../../reducers';
import { ADMIN_MENU } from './user-administration.menu';
import { ADMIN_NAVBAR } from './user-administration.navbar';

@Component({
	moduleId: module.id,
	selector: 'user-administration',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ 'user-administration.component.scss' ],
	templateUrl: 'user-administration.component.html',
//  	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UserAdministration implements OnInit {

	private questionList: Observable<any>;
	private questionListClone: Observable<any>;
	private componentQuestions: Observable<any>;

	private submitted:boolean = false;
  	private anyErrors: boolean;
  	private isAdminPage: boolean = true;
  	private finished: boolean;
	private menu: Array<any> = ADMIN_MENU;
	private navbar: Array<any> = ADMIN_NAVBAR;
	private homeRoute: string = '/user-administration';

	constructor(private questionActions: QuestionActions, private questionStore: Store<AppState>, private el : ElementRef ) {}

	private ngOnInit() {
		this.getForm();		
	}

  	private ngAfterViewInit() {
    	const contentTop = this.el.nativeElement.offsetParent.children[0].nodeName;
    	console.log('contentTop: '+contentTop)
    	if(contentTop == 'DC-CONTENT-TOP'){
    		this.isAdminPage = false;
    	}
  	}

	private getForm():void {

		this.questionStore.dispatch(this.questionActions.loadQuestions());
		this.componentQuestions = this.questionStore.select('questions');
	    this.componentQuestions.subscribe(
	        value => {
	        	if(value.length){
					this.questionStore.dispatch(this.questionActions.loadFormQuestions());
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
		this.questionStore.dispatch(this.questionActions.saveQuestions(questions));
	}


}
