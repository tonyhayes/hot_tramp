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
	GridQuestion,
	DatalistQuestion,
	TagSelectQuestion
} from '../../theme/components/dynamic-form';

@Injectable()
export class QuestionService {

  	private questionsUrl = 'questions/';  // URL to web API

  	constructor ( private http: Http, private heartbeatService: HeartbeatService ) {}

	getQuestionsInMemory() {
		let questions: QuestionBase<any>[] = [
			new InputQuestion({
				key: 'referenceNumber',
				label: 'RFI number',
				value: '8',
				readonly: true,
				order: 1
			}),
			new DateQuestion({
				key: 'issuedDate',
				label: 'Issued Date',
				value: '2016-09-12',
				readonly: true,
				order: 2
			}),
			new InputQuestion({
				key: 'projectName',
				label: 'Project',
				value: 'Seattle Central Library',
				readonly: true,
				order: 3
			}),
			new InputQuestion({
				key: 'jobNumber',
				label: 'Project Number',
				value: "200",
				readonly: true,
				order: 4
			}),
			new TextareaQuestion({
				key: 'jobDescription',
				label: 'Project Description',
				value: 'Seattle Central Library\nUniversity Library\n5009 Roosevelt Way NE\nSeattle WA, 98105',
				readonly: true,
				order: 5
			}),
			new TagSelectQuestion({
				key: 'sentTo',
				label: 'To',
				options: [
					{ key: 'thayes@dexterchaney.com',  value: 'Tony' },
					{ key: 'nsteier@dexterchaney.com',  value: 'Nick' },
					{ key: 'bneel@dexterchaney.com',   value: 'Bill' },
					{ key: 'scott@dexterchaney.com',   value: 'Scott' },
				],
				order: 6
			}),
			new TagSelectQuestion({
				key: 'sentCc',
				label: 'Cc',
				options: [
					{ key: 'thayes@dexterchaney.com',  value: 'Tony' },
					{ key: 'nsteier@dexterchaney.com',  value: 'Nick' },
					{ key: 'bneel@dexterchaney.com',   value: 'Bill' },
					{ key: 'scott@dexterchaney.com',   value: 'Scott' },
				],
				order: 7
			}),
			new BsDropdownQuestion({
				key: 'responsibility',
				label: 'Ball In Court',
				placeholder: 'Unassigned',
				options: [
					{ key: 'tony',  value: 'Tony' },
					{ key: 'bill',  value: 'Bill' },
					{ key: 'nick',   value: 'Nick' },
					{ key: 'scott',   value: 'Scott' },
					{ key: 'unassigned', value: 'Unassigned' }
				],
				order: 8
			}),
			new DateQuestion({
				key: 'scheduledDeliveryDate',
				label: 'Return Requested Date',
				value: null,
				order: 9
			}),
			new DateQuestion({
				key: 'returnRequiredDate',
				label: 'Return Required Date',
				value: '2016-12-12',
				order: 9
			}),
			new BsDropdownQuestion({
				key: 'activity',
				label: 'Current Action',
				options: [
					{ key: 'submitted',  value: 'Submitted' },
					{ key: 'review',  value: 'Awaiting Review' },
					{ key: 'returned',   value: 'Returned' },
					{ key: 'accepted', value: 'Accepted' },
					{ key: 'rejected', value: 'Rejected' },
				],
				order: 9
			}),
			new TextareaQuestion({
				key: 'topic',
				label: 'Topic',
				value: 'Shop Inspections for Structural Steel',
				order: 10
			}),
			new BsDropdownQuestion({
				key: 'subsection',
				label: 'Spec Section',
				value: '02200 (Earthwork)',
				options: [
					{ key: '02200',  value: '02200 (Earthwork)' },
					{ key: '01100',  value: '01100 (Mobilization)' },
					{ key: '02050',   value: '02050 (Demolition)' },
					{ key: '02660', value: '02660 (Water Distribtuion)' },
					{ key: '03100', value: '03100 (Concrete Formwork)' },
				],
				order: 11
			}),
			new TextareaQuestion({
				key: 'paragraph',
				label: 'Paragraph',
				order: 12
			}),
			new CheckboxQuestion({
				key: 'drawingImpact',
				label: 'Drawing Impact',
				type: 'checkbox',
				order: 13
			}),
			new CheckboxQuestion({
				key: 'costImpact',
				label: 'Cost Impact',
				type: 'checkbox',
				order: 14
			}),
			new CheckboxQuestion({
				key: 'scheduleImpact',
				label: 'Schedule Impact',
				type: 'checkbox',
				order: 15
			}),
			new InputQuestion({
				key: 'drawingReference',
				label: 'Drawing Reference',
				value: "Spec Sections 5120-4:1.4E, 01450-6:E1",
				order: 16
			}),
			new InputQuestion({
				key: 'drawingDetail',
				label: 'Drawing Detail',
				order: 17
			}),
			new InputQuestion({
				key: 'externalId',
				label: 'External Number',
				order: 18
			}),
			new BsDropdownQuestion({
				key: 'discipline',
				label: 'Discipline',
				options: [
					{ key: 'none',  value: 'None' },
					{ key: 'architectural',  value: 'Architectural' },
					{ key: 'civil',   value: 'Civil' },
					{ key: 'deadline', value: 'Deadline' },
					{ key: 'electrical', value: 'Electrical' },
					{ key: 'hvac', value: 'HVAC' },
					{ key: 'landscape', value: 'Landscape' },
					{ key: 'other', value: 'Other' },
					{ key: 'plumbing', value: 'Plumbing' },
					{ key: 'structural', value: 'Structural' },
				],
				order: 19
			}),
			new BsDropdownQuestion({
				key: 'priority',
				label: 'Priority',
				options: [
					{ key: 'high',  value: 'High' },
					{ key: 'medium',  value: 'Medium' },
					{ key: 'low',  value: 'Low' },
				],
				order: 20
			}),
			new BsDropdownQuestion({
				key: 'status',
				label: 'Status',
				options: [
					{ key: 'open',  value: 'Open' },
					{ key: 'closed',  value: 'Closed' },
				],
				order: 21
			}),
			new TextareaQuestion({
				key: 'request',
				label: 'Request',
				order: 22
			}),
			new DatalistQuestion({
				key: 'requestedBy',
				label: 'Requested By',
				options: [
					{ key: 'Tony',  value: 'Tony' },
					{ key: 'Nick',  value: 'Nick' },
					{ key: 'Bill',   value: 'Bill' },
					{ key: 'Scott', value: 'Scott' }
				],
				order: 23
			}),
			new TextareaQuestion({
				key: 'response',
				label: 'Response',
				order: 24
			}),
			new DatalistQuestion({
				key: 'respondedBy',
				label: 'Responded By',
				options: [
					{ key: 'Tony',  value: 'Tony' },
					{ key: 'Nick',  value: 'Nick' },
					{ key: 'Bill',   value: 'Bill' },
					{ key: 'Scott', value: 'Scott' }
				],
				order: 25
			}),
			new DateQuestion({
				key: 'respondedByDate',
				label: 'Responded By Date',
				order: 26
			}),
			new GridQuestion({
				key: 'relatedDocuments',
				label: 'Related Documents',
				options: {
					order: 27,
					label: 'Related Documents'
				},
				columns: [
					{ key: 'date',  label: 'Date' },
					{ key: 'logEntry',  label: 'Log Entry' },
					{ key: 'topic',   label: 'Topic' },
					{ key: 'direction', label: 'Direction' },
					{ key: 'status', label: 'Status' },
				],
				data: [
					{ 'date': '10/11/2016',
					'logEntry': 'This is a Log Entry',
					'topic': 'A Really Long Topic',
					'direction': 'Sone Sort of Direction',
					'status': 'Need another meeting' },
				]
			}),
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
