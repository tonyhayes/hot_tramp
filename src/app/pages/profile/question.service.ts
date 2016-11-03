import { Injectable, OnInit }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//import * as lfo from 'localforage-observable';
import { HeartbeatService } from '../../theme/services/http-api';

import { QuestionBase, 
	BsDropdownQuestion, 
	DropdownQuestion, 
	TextboxQuestion, 
	TextareaQuestion, 
	TextlineQuestion, 
	InputQuestion, 
	RadioQuestion,
	CheckboxQuestion,
	DateQuestion,
	DatalistQuestion,
	TagSelectQuestion
} from '../../theme/components/dynamic-form';

@Injectable()
export class QuestionService {

  	private questionsUrl = 'questions/';  // URL to web API

  	constructor (private http: Http, private heartbeatService: HeartbeatService) {}

	getQuestionsInMemory() {
		let questions: QuestionBase<any>[] = [
		new BsDropdownQuestion({
			key: 'brave',
			label: 'Bravery Rating',
			options: [
				{key: 'solid',  value: 'Solid'},
				{key: 'great',  value: 'Great'},
				{key: 'good',   value: 'Good'},
				{key: 'unproven', value: 'Unproven'}
			],
			order: 1
		}),
		new DropdownQuestion({
			key: 'brave7',
			label: 'Bravery Rating7',
			options: [
				{key: 'solid7',  value: 'Solid77'},
				{key: 'great7',  value: 'Great77'},
				{key: 'good7',   value: 'Good77'},
				{key: 'unproven7', value: 'Unproven77'}
			],
			order: 2
		}),
		new RadioQuestion({
			key: 'braveRadio',
			label: 'Bravery Rating Radio',
			type: 'radio',
			options: [
				{key: 'solid7',  value: 'Solid77'},
				{key: 'great7',  value: 'Great77'},
				{key: 'good7',   value: 'Good77'},
				{key: 'unproven7', value: 'Unproven77'}
			],
			order: 3
		}),
		new TextareaQuestion({
			key: 'firstName',
			label: 'First name',
			value: 'tony',
			required: true,
			order: 4
		}),
		new DateQuestion({
			key: 'date',
			label: 'Date',
			value: '2016-12-12',
			required: true,
			order: 5
		}),
		new CheckboxQuestion({
			key: 'emailOptIn',
			label: 'Send emails',
			type: 'checkbox',
			order: 6
		}),
		new InputQuestion({
			key: 'emailAddress',
			label: 'Email',
			type: 'email',
			order: 7
		}),
		new DatalistQuestion({
			key: 'cars',
			label: 'Cars',
			options: [
				{key: 'Volvo',  value: 'Volvo'},
				{key: 'Saab',  value: 'Saab'},
				{key: 'Mercedes',   value: 'Mercedes'},
				{key: 'Audi', value: 'Audi'}
			],
			order: 8
		}),
		new TagSelectQuestion({
			key: 'city',
			label: 'City',
			options: [
				{key: 'sea',  value: 'Seattle'},
				{key: 'sf',  value: 'San Francisco'},
				{key: 'austin',   value: 'Austin'},
			],
			order: 9
		})
		];
		return questions.sort((a, b) => a.order - b.order);
	}

  	getQuestions (): Observable<any> {
 		this.heartbeatService.setStoredValue(this.questionsUrl, this.getQuestionsInMemory());
//          localforage.newObservable.factory = function (subscribeFn) {
//             return Observable.create(subscribeFn);
//         };
// //		return new Observable.fromPromise();
//        	var observable = localforage.newObservable();
//        	var subscription = observable.subscribe({
//           		next: function(args) {
//             	console.log('I observe everything', args);
//           		},
//           		error: function(err) {
//             		console.log('Found an error!', err);
//           		},
//       			complete: function() {
//         		console.log('Observable destroyed!');
//           	}
//         });
	 //      	return new Observable(observer => {
	 //          	observer.fromPromise(
		// localforage.getItem(this.questionsUrl).then((data) =>{
  //         	console.log('getItem: '+ data);
  //         	return data;
  //       })
	 //          		);          
	 //      	});
		// localforage.getItem(this.questionsUrl).then((data) =>{
  //         	console.log('getItem: '+ data);
  //         	return data;
  //       })
  		if(this.heartbeatService.networkOnline()){

	      	return new Observable(observer => {
	          	observer.next(this.extractTestData(this.getQuestionsInMemory()));          
	      	});
	    	// return this.http.get(this.questionsUrl)
	     //            	.map(this.extractData)
	     //                .catch(this.handleError);
  		} else{

//			console.log('network offline - reading from localforage')  			
			//get response from localforage
			// this.heartbeatService.getStoredValue(this.questionsUrl, (data)=>{
		 //      	return new Observable(observer => {
		 //          	observer.next(data);          
		 //      	});

			// })
			// localForage.getItem(this.questionsUrl).then((value) => {
			//     // The same code, but using ES6 Promises.
			//     console.log(value);
		 //      	return new Observable(observer => {
		 //          	observer.next(value);          
		 //      	});
			// });

	      	return new Observable(observer => {
	          	observer.next(this.extractTestData(this.getQuestionsInMemory()));          
	      	});


  		}


   	}
  	private extractData(res: Response) {
  		console.log(res)
    	let body = res.json();
		//write response to localforage
 		this.heartbeatService.setStoredValue(this.questionsUrl, body)
    	return body.data || { };
  	}
  	private extractTestData(res) {
		//write response to localforage
 		this.heartbeatService.setStoredValue(this.questionsUrl, res)
    	return res;
  	}

  	private handleError (error: any) {
    	// In a real world app, we might use a remote logging infrastructure
    	// We'd also dig deeper into the error to get a better message
    	const errMsg = (error.message) ? error.message :
      		error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console instead
    	return Observable.throw(errMsg);
  	}

}
