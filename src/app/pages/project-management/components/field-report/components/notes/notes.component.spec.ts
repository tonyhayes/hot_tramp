import { Notes } from './notes.component';
import { QuestionService } from '../../../../../../services';
import { GlobalState } from '../../../../../../global.state';
import { TRANSLATIONS, TranslateService } from '../../../../../../translate';
import { DatePipe } from "@angular/common"
import {} from 'jasmine'

describe('Notes', () => {

	const qs = new QuestionService();
	const translateService = new TranslateService(TRANSLATIONS);
	it('should create a translateService', () => {
		expect(translateService).toBeDefined();
	});

	const dp = new DatePipe();
	const gs = new GlobalState();
	it('should create a GlobalState', () => {
		expect(gs).toBeDefined();
	});

	const router = {
		navigate: ()=>{}		
	}
	const mockCategoryWeatherResponse = 
		{
			jobCode: '1',
			category:{
				id: '1',
				title: 'Weather',
				icon: 'ion-umbrella',
				componentType: 'notes',
				order: 1,

			},
			questionList: [
				{
                        key: 'temp',
                        label: 'Temp',
                        type: 'number',
                        groupColumns: "3-Column",
                        groupTitle: 'Weather',
                        order: 1,
                        value: null,
                        controlType: 'input'							
				},
				{
                        key: 'wind',
                        label: 'Wind',
                        type: 'text',
                        order: 2,
                        value: null,
                        controlType: 'input'							
				},
				{
                        key: 'precip',
                        label: 'Precip',
                        type: 'text',
                        order: 3,
                        value: null,
                        controlType: 'input'							
				},
				{
                        key: 'event',
                        label: 'Event',
                        type: 'text',
                        order: 4,
                        value: null,
                        controlType: 'input'							
				},
				{
                        key: 'sky',
                        label: 'sky',
                        type: 'text',
                        order: 5,
                        value: null,
                        controlType: 'input'							
				},
				{
                        key: 'ground',
                        label: 'Ground',
                        type: 'text',
                        order: 6,
                        value: null,
                        controlType: 'input'							
				},
				{
                        key: 'delay',
                        label: 'Weather Delay',
                        type: 'checkbox',
                        order: 7,
                        value: null,
                        controlType: 'checkbox'							
				},
				{
                        key: 'photo',
                        label: 'Photo Attachments',
                        type: 'photo',
                        groupColumns: "1-Column",
                        groupTitle: 'Photo Attachments',
                        order: 8,
                        value: null,
                        controlType: 'photo'							
				},
			]
		}

	const fieldReport = {
  	"actionee": "584af775e808bcf75f0603b6 jbuhner@dexchadev.com",
  	"notes": [
		{
	  		"category": "weather",
	  		"description": "Weather",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.931",
	  		"lastUpdated": "2017-05-02T18:34:45.931",
	  		"fieldReportEntryId": "77a2998e-fa6f-49ef-a4ab-4d7d92e9450b",
	  		"rejection": null
		},
		{
	  		"category": "crew",
	  		"description": "Crew",
	  		"phase": null,
	  		"content": [{content: {12: {hello:'hi'}}}],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "dbf992cb-9e9c-428e-9e3f-50137820f466",
	  		"rejection": null
		},
		{
	  		"category": "visitor",
	  		"description": "Visitor",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "1ca906fd-bf4b-4905-ae23-cca8bef6c3ad",
	  		"rejection": null
		},
		{
	  		"category": "notes",
	  		"description": "Work Completed",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "96bb376a-fe05-460f-8ead-0b4cbf2c7f31",
	  		"rejection": null
		},
		{
	  		"category": "photo",
	  		"description": "Photo",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "103fb3c3-1331-4bc9-9189-69c06e5127ec",
	  		"rejection": null
		},
		{
	  		"category": "signature",
	  		"description": "Signature",
	  		"phase": null,
	  		"content": [],
	  		"created": "2017-05-02T18:34:45.935",
	  		"lastUpdated": "2017-05-02T18:34:45.935",
	  		"fieldReportEntryId": "af28c475-7eb1-43e5-99df-8865a2b4d9ec",
	  		"rejection": null
		}
  	],
  	"id": "0913a059-fff1-4ca5-895d-e5ef24a160e0",
  	"tenant": "mech-co",
  	"jobCode": "PLM_city",
  	"forDay": "2017-05-02",
  	"createdDay": "2017-05-02T18:34:45.935",
  	"originator": "jbuhner@dexchadev.com",
  	"status": "Open"
}			



	const notes = new Notes(null, null, null, router, translateService, qs, gs, dp);
	notes.fieldReport = fieldReport;
	notes.category = mockCategoryWeatherResponse;
	notes.questions = mockCategoryWeatherResponse.questionList;
	const pmStore = {
		dispatch: ()=>{}		
	}
	const pmActions = {
		addFieldReport: ()=>{},		
		saveFieldReport: ()=>{},		
		deleteFieldReport: ()=>{},		
		updateFieldReportCategory: ()=>{}		
	}
	notes.pmStore = pmStore;
	notes.pmActions = pmActions;

	//specs
	it('should create dashboard', () => {
	  expect(notes).toBeDefined();
	});
	it('should create homeRoute', () => {
	  expect(notes.homeRoute).toEqual('/project-management/dashboard');
	});
	// it('should run getJob', () => {
	// 	notes.getJob();
	// 	expect(notes.finished).toEqual(true);
	// });
	it('should run getForm', () => {
		notes.getForm();
		expect(notes.finished).toEqual(true)
	});
	it('should run onCancel', () => {
		notes.onCancel();
		expect(notes.finished).toEqual(true);
	});
	it('should run onSubmit', () => {
		notes.onSubmit();
		expect(notes.finished).toEqual(true);
	});
	it('should run ngOnDestroy', () => {
		notes.ngOnDestroy();
		expect(notes.finished).toEqual(true);
	});

}) 

