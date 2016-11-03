import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup }       						from '@angular/forms';

import { QuestionService } 						from './question.service';

import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeroActions } from './actions';
import { AppState } from './reducers';


@Component({
	moduleId: module.id,
	selector: 'profile',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [ 'profile.component.scss' ],
	templateUrl: 'profile.component.html',
//  	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class Profile implements OnInit {

	heroes: Observable<any>;
	addingHero = false;
	selectedHero;

	public submitted:boolean = false;
	public errorMessage:string;
	public questions: any[];
  public counterValue = 3;
  public minValue = 0;
  public maxValue = 12;

	constructor(private service: QuestionService, private heroActions: HeroActions, private heroStore: Store<AppState>) {}
	ngOnInit() { 
		this.getQuestions();
		this.heroStore.dispatch(this.heroActions.loadHeroes());
		this.heroes = this.heroStore.select('heroes');
 
	}

	public getQuestions():void {
		this.service.getQuestions()
						.subscribe(
							questions => this.questions = questions,
							error =>  this.errorMessage = <any>error);
	}
	delete(hero) {
		this.heroStore.dispatch(this.heroActions.deleteHero(hero));
	}

	select(hero) {
		this.selectedHero = hero;
		this.addingHero = false;
	}

	public onSubmit(values:FormGroup):void {
		console.log(JSON.stringify(values));
	}




}
