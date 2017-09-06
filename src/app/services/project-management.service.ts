import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response }          from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import * as toastr from 'toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/observable/of';
import { Util } from '../framework/helpers/util';
import { GlobalState } from '../global.state';
import { CategoryQuestions } from '../pages/project-management/model/job';
import { CategoryManager, Category } from '../pages/project-management/model/category';
import { TranslateService } from '../translate';

@Injectable()
export class ProjectManagementService {
	jobCodesUrl: string = 'jobs/';
	fieldReportUrl: string = 'fieldreports/';
	sendFieldReportUrl: string = 'fieldreports/submittal/';
	fieldReportObject;
	fieldReportsObject = [];
	fieldReportsSubmittedObject = [];

	categories = new CategoryManager();
	genericSubmittedReportsList = [{"actionee":"585042227ba1a03b373fca04","nextActionee":null,"forDay":"2017-08-03","id":"a5e75368-08e7-44ca-a65a-bc6be439db78","actioneeName":"sgossard@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":null,"status":"Submitted"}]
	genericOpenReportsList = [{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-09-01","id":"9d54058a-0dbc-446b-99f8-33920b56d134","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-31","id":"b3fb8ce5-9196-48e7-b42f-c6b4d2e91e78","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-30","id":"31a74e96-5479-4ccb-a659-24b28be0f3f8","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-29","id":"70655dad-38b1-4c5e-a354-7756f53e5dce","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-26","id":"18c8dc91-81e3-4fa2-973f-fe9b3bf50bf3","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-25","id":"e8e52dbb-f49a-439c-9cb4-04e8d54a4132","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-22","id":"d2ab19bd-42e7-43a7-ba5a-a63af392b4e7","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-21","id":"7de2af14-9749-471e-9541-2fab935015da","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-18","id":"fa16ec27-8f12-49c6-8d68-680373d74145","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-17","id":"f2d70d33-efcd-4b6b-8836-749ff4c8ad2c","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-17","id":"13959c0c-25c1-4ad5-89e2-546aaa1e6009","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-15","id":"bbd91d17-587b-47ae-a7f9-f85a83b0abfe","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-14","id":"56a4b03d-ea36-42a4-b1d3-add62247f871","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-13","id":"e5f5e7e1-50b0-4098-8040-8cefcf6b6e05","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-12","id":"3153a1ad-5542-48c5-a1bc-58e38d0edab6","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-11","id":"19659887-6612-46d9-99f0-cdc132e4a9f7","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-09","id":"2614217e-217b-4c43-9822-b0a041deac07","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-08","id":"95ebd42b-df30-4420-9ffa-2476acaf6b92","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-08-08","id":"e34a7247-b0ef-4de9-ab75-c42a854a176c","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-07-26","id":"e0642731-b21f-4cbe-b511-2a4a4802f3f8","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"},{"actionee":"584af775e808bcf75f0603b6","nextActionee":"585042227ba1a03b373fca04","forDay":"2017-06-16","id":"3c1c200a-3cbd-462a-9c7b-401cc98b54e9","actioneeName":"jbuhner@dexchadev.com","jobCode":"mech-coa","jobDescription":"1st mech-co","nextActioneeName":"sgossard@dexchadev.com","status":"Open"}]
	genericCategoriesList = [{"categoryId":1,"categoryTitle":"Weather","icon":"ion-umbrella","displayOrder":1,"componentType":"notes","printFlag":false},{"categoryId":2,"categoryTitle":"Crew","icon":"ion-android-contacts","displayOrder":2,"componentType":"notes","printFlag":false},{"categoryId":3,"categoryTitle":"Visitor","icon":"ion-clipboard","displayOrder":3,"componentType":"notes","printFlag":false},{"categoryId":4,"categoryTitle":"Work Completed","icon":"ion-hammer","displayOrder":4,"componentType":"notes","printFlag":false},{"categoryId":5,"categoryTitle":"Photo","icon":"ion-android-image","displayOrder":5,"componentType":"notes","printFlag":false},{"categoryId":6,"categoryTitle":"Signature","icon":"ion-paintbrush","displayOrder":6,"componentType":"notes","printFlag":false}]
	genericJobsList = [{"tenantId":null,"jobCode":"mech-coa","userId":"584af775e808bcf75f0603b6","jobDescription":"1st mech-co","userName":"jbuhner@dexchadev.com","superId":"585042227ba1a03b373fca04","superName":"sgossard@dexchadev.com"}]
	genericProjectList = [
		{
			id: 0,
			name: 100,
			description: "Bid - Seattle School 1"

		},
		{
			id: 1,
			name: 200,
			description: "Electrical - Seattle School 1"

		},
		{
			id: 2,
			name: 300,
			description: "Plumbing - Seattle School 1"

		},
		{
			id: 3,
			name: 400,
			description: "Bid - Seattle Library 2"

		},
		{
			id: 4,
			name: 500,
			description: "Electrical - Seattle Library 2"

		},
		{
			id: 5,
			name: 600,
			description: "Plumbing - Seattle Library 2"

		},
	];
	genericCategoryList = [
		{
			id: 0,
			name: this.translate.instant('WEATHER'),
			description: "Weather Log",
			listStyle: false

		},
		{
			id: 1,
			name: this.translate.instant('VISITOR'),
			description: "Visitor Log",
			listStyle: true

		},
		{
			id: 2,
			name: this.translate.instant('WORK_COMPLETED'),
			description: "Work Performed Log",
			listStyle: true

		},
	];
	genericFormList = [
		{
			id: 0,
			name: this.translate.instant('WEATHER'),
			description: "Weather Log - Form #1"

		},
		{
			id: 1,
			name: this.translate.instant('VISITOR'),
			description: "Visitor Log - Standard"

		},
		{
			id: 2,
			name: this.translate.instant('WORK_COMPLETED'),
			description: "Work Performed Log - Revised 1/2017"

		},
	];
	genericJobList = [
		{
			id: 0,
			name: 'Job 100',
			description: "Seattle School 1"

		},
		{
			id: 1,
			name: 'Job 200',
			description: "Seattle Library 2"

		},
		{
			id: 2,
			name: 'Job 300',
			description: "Seattle Fire Dept 3"

		},
	];
	mockCategoriesResponse = 
		[
			{
				categoryId: '1',  
				categoryTitle: this.translate.instant('WEATHER'), 
				icon: 'ion-umbrella',
				componentType: 'notes',
				listStyle: false, 
				displayOrder : 1
				
			},
			{
				categoryId: '2',
				categoryTitle: this.translate.instant('CREW'),
				icon: 'ion-android-contacts',
				componentType: 'notes',
				displayOrder: 2,
				listStyle: false
				
			},
			{
				categoryId: '3',
				categoryTitle: this.translate.instant('VISITOR'),
				icon: 'ion-clipboard',
				componentType: 'notes',
				displayOrder: 3,
				listStyle: true
				
			},
			{
				categoryId: '4',
				categoryTitle: this.translate.instant('WORK_COMPLETED'),
				icon: 'ion-hammer',
				componentType: 'notes',
				displayOrder: 4,
				listStyle: true
				
			},
			{
				categoryId: '5',
				categoryTitle: this.translate.instant('PHOTO'),
				icon: 'ion-android-image',
				componentType: 'notes',
				displayOrder: 5,
				listStyle: true
				
			},
			{
				categoryId: '6',
				categoryTitle: this.translate.instant('SIGNATURE'),
				icon: 'ion-paintbrush',
				componentType: 'notes',
				displayOrder: 6,
				listStyle: true
				
			},
		]
	mockCategoryWeatherResponse = 
		{
			jobCode: '1',
			category:{
				id: '1',
				title: this.translate.instant('WEATHER'),
				icon: 'ion-umbrella',
				componentType: 'notes',
				order: 1,
				listStyle: false

			},
			questionList: [
				{
                        key: 'temp',
                        label: this.translate.instant('TEMP'),
                        type: 'number',
                        groupColumns: "3-Column",
                        groupTitle: 'Weather',
                        order: 1,
                        value: null,
                        controlType: 'input'							
				},
				{
                        key: 'wind',
                        label: this.translate.instant('WIND'),
                        type: 'text',
                        order: 2,
                        value: null,
                        controlType: 'input'							
				},
				{
                        key: 'precip',
                        label: this.translate.instant('PRECIP'),
                        type: 'text',
                        order: 3,
                        value: null,
                        controlType: 'input'							
				},
				{
                        key: 'event',
                        label: this.translate.instant('EVENT'),
                        type: 'text',
                        order: 4,
                        value: null,
                        controlType: 'input'							
				},
				{
                        key: 'sky',
                        label: this.translate.instant('SKY'),
                        type: 'text',
                        order: 5,
                        value: null,
                        controlType: 'input'							
				},
				{
                        key: 'ground',
                        label: this.translate.instant('GROUND'),
                        type: 'text',
                        order: 6,
                        value: null,
                        controlType: 'input'							
				},
				{
                        key: 'delay',
                        label: this.translate.instant('WEATHER_DELAY'),
                        type: 'checkbox',
                        order: 7,
                        value: null,
                        controlType: 'checkbox'							
				},
				{
                        key: 'photo',
                        label: this.translate.instant('PHOTO_ATTACHMENT'),
                        type: 'photo',
                        groupColumns: "1-Column",
                        groupTitle: this.translate.instant('PHOTO_ATTACHMENT'),
                        order: 8,
                        value: null,
                        controlType: 'photo'							
				},
				{
                        key: 'observation',
                        label: this.translate.instant('WEATHER_REPORT'),
                        type: 'weather-underground',
                        groupColumns: "1-Column",
                        groupTitle: this.translate.instant('WEATHER_REPORT'),
                        order: 9,
                        value: null,
                        controlType: 'weather-underground'							
				},
			]
		}

		mockCategoryVisitorResponse = 
		{
			jobCode: '3',
			category:{
				id: '3',
				title: this.translate.instant('VISITOR'),
				icon: 'ion-clipboard',
				componentType: 'notes',
				order: 3,
				listStyle: true

			},
			questionList: [
				{
                        key: 'name',
                        label: this.translate.instant('VISITOR_NAME'),
                        type: 'text',
                        groupColumns: "2-Column",
                        groupTitle: this.translate.instant('VISITOR'),
                        order: 1,
                        value: null,
                        controlType: 'input'							
				},
				{
                        key: 'company',
                        label: this.translate.instant('COMPANY'),
                        type: 'text',
                        order: 2,
                        value: null,
                        controlType: 'input'							
				},
				{
                        key: 'for',
                        label: this.translate.instant('FOR'),
                        type: 'text',
                        order: 3,
                        value: null,
                        controlType: 'input'							
				},
				{
                        key: 'to',
                        label: this.translate.instant('TO_SEE'),
                        type: 'text',
                        order: 4,
                        value: null,
                        controlType: 'input'							
				},
				{
                        key: 'timeIn',
                        label: this.translate.instant('TIME'),
                        type: 'time',
                        groupColumns: "2-Column",
                        groupTitle: 'Time',
                        order: 5,
                        value: null,
                        controlType: 'time'							
				},
				{
                        key: 'timeOut',
                        label: this.translate.instant('TIME_OUT'),
                        type: 'time',
                        order: 6,
                        value: null,
                        controlType: 'time'							
				},
				{
                        key: 'signature',
                        label: this.translate.instant('VISTOR_SIGNATURE'),
                        type: 'signature',
                        groupColumns: "1-Column",
                        groupTitle: this.translate.instant('VISTOR_SIGNATURE'),
                        order: 7,
                        value: null,
                        controlType: 'signature'							
				},
			]
		}
		mockCategoryCrewResponse = 
		{
			jobCode: '2',
			category:{
				id: '2',
				title: this.translate.instant('CREW'),
				icon: 'ion-android-contacts',
				componentType: 'notes',
				order: 2,
				listStyle: true

			},
			questionList: [
				{
						key: 'subcontractor',
						label: this.translate.instant('SUBCONTRACTOR'),
						type: 'text',
						order: 1,
					 	groupColumns: "2-Column",
					 	groupTitle: this.translate.instant('CREW'),
                        value: null,
                        controlType: 'input'							
				},
				{
						key: 'workerCount',
						label: this.translate.instant('WORKER_COUNT'),
						type: 'number',
						order: 2,
                        value: null,
                        controlType: 'input'							
				},
				{
						key: 'notes',
						label: this.translate.instant('NOTES'),
						type: 'text',
						groupColumns: "1-Column",
						groupTitle: this.translate.instant('NOTES'),
						order: 3,
                        value: null,
                        controlType: 'notes'							
				},
			]
		}
	
		mockCategoryWorkCompletedResponse = 
		{
			jobCode: '4',
			category:{
				id: '4',
				title: this.translate.instant('WORK_COMPLETED'),
				icon: 'ion-hammer',
				componentType: 'notes',
				order: 4,
				listStyle: false

			},
			questionList: [
				{
						key: 'location',
						label: this.translate.instant('LOCATION'),
						type: 'text',
						order: 1,
					 	groupColumns: "1-Column",
					 	groupTitle: this.translate.instant('WORK_COMPLETED'),
                        value: null,
                        controlType: 'input'							
				},
				{
						key: 'phase',
						label: this.translate.instant('PHASE'),
						type: 'text',
						order: 2,
                        value: null,
                        controlType: 'input'							
				},
				{
						key: 'notes',
						label:this.translate.instant('NOTES'),
						type: 'text',
						groupColumns: "1-Column",
						groupTitle: this.translate.instant('NOTES'),
						order: 3,
                        value: null,
                        controlType: 'notes'							
				},
			]
		}
		mockCategoryPhotoResponse = 
		{
			jobCode: '5',
			category:{
				id: '5',
				title: this.translate.instant('PHOTO_GALLERY'),
				icon: 'ion-android-image',
				componentType: 'notes',
				order: 5,
				listStyle: true

			},
			questionList: [
				{
                        key: 'photos',
                        label:  this.translate.instant('PHOTO_GALLERY'),
                        type: 'photos',
                        groupColumns: "1-Column",
                        groupTitle:  this.translate.instant('PHOTO_GALLERY'),
                        order: 1,
                        value: null,
                        controlType: 'photos'							
				},
				{
                        key: 'notes',
                        label:  this.translate.instant('NOTES'),
                        type: 'textarea',
                        order: 2,
                        value: null,
                        controlType: 'textarea'							
				},
			]
		}
		mockCategorySignatureResponse = 
		{
			jobCode: '6',
			category:{
				id: '6',
				title: this.translate.instant('VISTOR_SIGNATURE'),
				icon: 'ion-paintbrush',
				componentType: 'notes',
				order: 6,
				listStyle: true

			},
			questionList: [
				{
                        key: 'signature',
                        type: 'signature',
                        groupColumns: "1-Column",
                        groupTitle: this.translate.instant('VISTOR_SIGNATURE'),
                        order: 1,
                        value: null,
                        controlType: 'signature'							
				},
				{
                        key: 'notes',
                        label: this.translate.instant('NOTES'),
                        type: 'textarea',
                        order: 2,
                        value: null,
                        controlType: 'textarea'							
				},
			]
		}

		gernericFieldReport = 
		{
		    "actionee": "584af775e808bcf75f0603b6",
		    "jobCode": "mech-coa",
		    "forDay": "2017-06-04",
		    "createdDay": "2017-06-27T17:38:38.152Z",
		    "notes": [
		        {
		            "category": "Weather",
		            "description": "1",
		            "content": []
		        },
		        {
		            "category": "Crew",
		            "description": "2",
		            "content": []
		        },
		        {
		            "category": "Visitor",
		            "description": "3",
		            "content": []
		        },
		        {
		            "category": "Work Completed",
		            "description": "4",
		            "content": []
		        },
		        {
		            "category": "Photo",
		            "description": "5",
		            "content": []
		        },
		        {
		            "category": "Signature",
		            "description": "6",
		            "content": []
		        }
		    ]
		}
	constructor (private authHttp: AuthHttp, private state: GlobalState, private translate: TranslateService) {}

	getBaseUrl(): string {
        return this.state.getCurrent('app.API_REST_URL');
	}

	getJobCodes(): Observable<any[]> {
		return Observable.of(this.genericJobsList);			
		// return this.authHttp.get(this.getBaseUrl() + this.jobCodesUrl)
		// 	.map(res => res.json())
		// 	.map((jobs:any[]) => {
		// 		return jobs
		// 	})
		// 	.catch(error => {
		// 		console.log('catch')
		// 		return Observable.of(error.json())
		// 	})
	}
	getJobCategories(jobCodePayload): Observable<any[]> {
		this.categories.addCategories(this.genericCategoriesList)
		return Observable.of(this.categories.getCategories());			

		// return this.authHttp.get(this.getBaseUrl() + this.jobCodesUrl + jobCodePayload.payload +'/categories')
		// 	.map(res => res.json())
		// 	.map((categories:any[]) => {
		// 		if(categories && categories.length){
		// 			this.categories.addCategories(categories);
		// 			return this.categories.getCategories();
		// 		}
		// 	})
		// 	.catch(error => {
		// 		console.log('catch getJobCategories')
		// 		return Observable.of(error)
		// 	})
	}
	getJobCategory(jobCategory): Observable<CategoryQuestions> {
		const job = jobCategory.payload[0];
		const category = jobCategory.payload[1];
		console.log(category)
		if(category == 1 || category == 'Weather'){
			return Observable.of(this.mockCategoryWeatherResponse);						
		}
		if(category == 2 || category == 'Crew'){
			return Observable.of(this.mockCategoryCrewResponse);						
		}
		if(category == 3 || category == 'Visitor'){
			return Observable.of(this.mockCategoryVisitorResponse);						
		}
		if(category == 4 || category == 'Work Completed'){
			return Observable.of(this.mockCategoryWorkCompletedResponse);						
		}
		if(category == 5 || category == 'Photo'){
			return Observable.of(this.mockCategoryPhotoResponse);						
		}
		if(category == 6 || category == 'Signature'){
			return Observable.of(this.mockCategorySignatureResponse);						
		}
	}
	addFieldReport(fieldReport): Observable<any> {
		console.log(JSON.stringify(fieldReport, undefined, 4));
		const endpoint = this.getBaseUrl() + this.fieldReportUrl + fieldReport.jobCode + '/' + fieldReport.forDay 
		return this.authHttp.post(endpoint, Util.stringifyContent(fieldReport))
			.map(res => res.json())
			.map((report) => {
				console.log('response')
				this.fieldReportObject =  Util.parseContent(report)
				return this.fieldReportObject
			})
			.catch(error => {
				console.log('catch')
				return Observable.of(error.json())
			})
	}
	deleteFieldReport(fieldReport): Observable<any> {
		const endpoint = this.getBaseUrl() + this.fieldReportUrl + fieldReport.id  
		return this.authHttp.delete(endpoint)
			.map((res) => {
				return res;
			})
			.catch(error => {
				console.log('catch')
				return Observable.of(error)
			})
	}

	saveFieldReport(fieldReport): Observable<any> {
		this.fieldReportObject = fieldReport
		console.log(JSON.stringify(fieldReport, undefined, 4));
		const endpoint = this.getBaseUrl() + this.fieldReportUrl + fieldReport.jobCode + '/' + fieldReport.forDay 
		return this.authHttp.post(endpoint, Util.stringifyContent(fieldReport))
			.map(res => res.json())
			.map((report) => {
				console.log('save')
				return  Util.parseContent(report)
			})
			.catch(error => {
				console.log('catch')
				return Observable.of(error.json())
			})
	}
	updateFieldReportCategory(fieldReportCategoryObject): Observable<any> {
		const fieldReportId = fieldReportCategoryObject[0]
		const category = fieldReportCategoryObject[1]
		const endpoint = this.getBaseUrl() + this.fieldReportUrl + fieldReportId + '/notes/' + category.sequence 
		return this.authHttp.patch(endpoint, Util.stringifyCategoryContent(category))
			.map(res => res.json())
			.map((category) => {
				console.log('update cat');
				const note = Util.parseCategoryContent(category);
				this.fieldReportObject = Util.replaceCategoryObject(this.fieldReportObject, note.description, note)
				return  this.fieldReportObject;
			})
			.catch(error => {
				console.log('catch on cat update')
				return Observable.of(error.json())
			})
	}

	getFieldReport(fieldReportId): Observable<any> {
		this.fieldReportObject = Util.parseContent(this.genericFieldReport)
		return Observable.of(this.fieldReportObject);			
		// const endpoint = this.getBaseUrl() + this.fieldReportUrl + fieldReportId 
		// return this.authHttp.get(endpoint)
		// 	.map(res => res.json())
		// 	.map((fieldReport) => {
		// 		this.fieldReportObject = Util.parseContent(fieldReport)
		// 		console.log(this.fieldReportObject)
		// 		return this.fieldReportObject;
		// 	})
  // 		 	.catch(error => {
  // 		     	console.log('catch')
  // 		     	return Observable.of(error.json())
  // 		 })
	}
	sendFieldReport(fieldReportId): Observable<any> {
		const endpoint = this.getBaseUrl() + this.sendFieldReportUrl + fieldReportId 
		return this.authHttp.put(endpoint, null)
			.map(res => res.json())
			.map((fieldReport) => {
				this.fieldReportObject = Util.parseContent(fieldReport)
				console.log(this.fieldReportObject)
				return this.fieldReportObject;
			})
  		 	.catch(error => {
  		     	console.log('catch')
  		     	return Observable.of(error.json())
  		 })
	}
	getFieldReports(): Observable<any> {
		return Observable.of(this.genericOpenReportsList);			

		// return this.authHttp.get(this.getBaseUrl() + this.fieldReportUrl, {
  //       		params: {
  //           		status: 'Open'
  //       		}
  //    		})
		// 	.map(res => res.json())
		// 	.map((reports) => {
		// 		this.fieldReportsObject = reports
		// 		return reports
		// 	})
  //       	.catch(error => {
  //       		console.log('catch')
  //       		return Observable.of(error.json())
  //       	})
	}
	getSubmittedFieldReports(): Observable<any> {
		return Observable.of(this.genericSubmittedReportsList);			
		// let d = new Date();
		// d.setDate(d.getDate() - 31);
		// const day = Util.pad(d.getDate());
		// const month = Util.pad(d.getMonth()+1);
		// const year = d.getFullYear();
		// const fromDate = `${year}-${month}-${day}`

		// return this.authHttp.get(this.getBaseUrl() + this.fieldReportUrl, {
  //       		params: {
  //           		fromDate: fromDate,
  //           		status: 'Submitted'
  //       		}
  //    		})
		// 	.map(res => res.json())
		// 	.map((reports) => {
		// 		this.fieldReportsSubmittedObject = reports
		// 		return reports
		// 	})
  //       	.catch(error => {
  //       		console.log('catch')
  //       		return Observable.of(error.json())
  //       	})
	}
	getLoadedFieldReport(): Observable<any> {
		return Observable.of(this.fieldReportObject);			
	}
	getLoadedFieldReports(): Observable<any> {
		return Observable.of(this.fieldReportsObject.concat(this.fieldReportsSubmittedObject));			
	}

	getProjects(): Observable<any> {
		return Observable.of(this.genericProjectList);			
	}
	getCategories(): Observable<any> {
		return Observable.of(this.genericCategoryList);			
	}
	getForms(): Observable<any> {
		return Observable.of(this.genericFormList);			
	}
	getJobs(): Observable<any> {
		return Observable.of(this.genericJobList);			
	}

}