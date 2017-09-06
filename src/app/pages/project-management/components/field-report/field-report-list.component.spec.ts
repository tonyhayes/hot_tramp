import { FieldReportList } from './field-report-list.component';
import { GlobalState } from '../../../../global.state';
import { TRANSLATIONS, TranslateService } from '../../../../translate';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { DatePipe } from "@angular/common"
import {} from 'jasmine'

describe('FieldReportList', () => {

	const translateService = new TranslateService(TRANSLATIONS);
	it('should create a translateService', () => {
		expect(translateService).toBeDefined();
	});

	const gs = new GlobalState();
	it('should create a GlobalState', () => {
		expect(gs).toBeDefined();
	});
	const modal =  new NgbModal(null)
	const dp = new DatePipe();

	const item = {
		statusType: 0,
		jobs : [
		{
			job: '14374',
			id: '14374',
			phase: 'pool',
			owner: 'Fred',
			date: '10/12/2017',
			description: 'ingound pool',
			projectManager: 'Sam',
			submit: true,
			edit: true,
			copy: true,
			delete: true,
			status: 'o'
		},
		{
			job: '54378',
			id: '54378',
			phase: 'landscape',
			owner: 'Fred',
			date: '2/12/2017',
			description: 'landscape pool area',
			projectManager: 'Sam',
			submit: true,
			edit: true,
			delete: true,
			copy: true,
			status: 'o'
		},
		{
			job: '84378',
			id: '84378',
			phase: 'electrical',
			owner: 'Fred',
			date: '1/12/2017',
			description: 'install electric',
			projectManager: 'Sam',
			submit: true,
			edit: true,
			delete: true,
			copy: true,
			status: 'o'
		},
		{
			job: '44574',
			id: '44574',
			phase: 'procurement',
			owner: 'Fred',
			date: '5/12/2017',
			description: 'procurement plan',
			projectManager: 'Sam',
			submit: true,
			edit: true,
			status: 'r'
		},
		{
			job: '87569',
			id: '87569',
			phase: 'materials',
			owner: 'Fred',
			date: '7/12/2017',
			description: 'handle materials',
			projectManager: 'Sam',
			submit: true,
			edit: true,
			status: 'r'
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
		  		"content": [],
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
		  		"content": [{23:{
		  				note: 2  			
		  				  		}}],
		  		"created": "2017-05-02T18:34:45.935",
		  		"lastUpdated": "2017-05-02T18:34:45.935",
		  		"fieldReportEntryId": "96bb376a-fe05-460f-8ead-0b4cbf2c7f31",
		  		"rejection": null
			},
			{
		  		"category": "photo",
		  		"description": "Photo",
		  		"phase": null,
		  		"content":  [{"content":[{23:{
		  				  				note: 2  			
		  				  				  		}}]}],
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




	const router = {
		navigate: ()=>{},		
		events:{
			subscribe: ()=>{}
		},
	}

	const pmStore = {
		dispatch: ()=>{},		
		select: ()=>{
		  return {subscribe: ()=> {}}
		}		
	}
	const pmActions = {
		loadFieldReport: ()=>{},		
		loadFieldReports: ()=>{},		
		loadSubmittedFieldReports: ()=>{}		
	}
	const fieldReportList = new FieldReportList(router, translateService, gs, modal, null, null, null);
	var result: Promise<any>;

		fieldReportList.modalService.open =  ()=>{ 
		  return {result: {
					  then: ()=> { return {}}
					}}

		 }
	fieldReportList.pmStore = pmStore;
	fieldReportList.pmActions = pmActions;
	fieldReportList.datePipe = dp;


	//specs
	it('should create fieldReportList', () => {
		expect(fieldReportList).toBeDefined();
	});
	it('should create homeRoute', () => {
		expect(fieldReportList.homeRoute).toEqual('/project-management/dashboard');
	});
	it('should run ngOnInit', () => {
		fieldReportList.ngOnInit()
		expect(fieldReportList.activeAccordionItem).toEqual({});
	});
	it('should run openAccordionItem', () => {

		fieldReportList.activeAccordionItem ={id:'44574', status: 'Open'}  		
		expect(fieldReportList.openAccordionItem()).toEqual(undefined);
		fieldReportList.activeAccordionItem ={id:'445', status: 'tony'}  		
		expect(fieldReportList.openAccordionItem()).toEqual(undefined);
	});
	it('should run onSend', () => {

		fieldReportList.onSend({id: '7', jobCode: '17'}, '<div>hi</div>')  		
		expect(fieldReportList.dialogTitle).toEqual('HEADING_SUBMIT_FIELD_REPORT');
	});
	it('should run onDelete', () => {

		fieldReportList.onDelete({id: '7', jobCode: '17'}, '<div>hi</div>')  		
		expect(fieldReportList.dialogTitle).toEqual('HEADING_DELETE_FIELD_REPORT');
	});
	it('should run onCopy', () => {

		fieldReportList.onCopy({id: '7', jobCode: '17'}, '<div>hi</div>')  		
		expect(fieldReportList.dialogTitle).toEqual('HEADING_COPY_FIELD_REPORT');
	});
	it('should run onCopy', () => {

		fieldReportList.onCopy({id: '7', jobCode: '17'}, '<div>hi</div>')  		
		expect(fieldReportList.dialogTitle).toEqual('HEADING_COPY_FIELD_REPORT');
	});
	it('should run onFlag', () => {

		fieldReportList.onFlag({id: '7', jobCode: '17'})  		
		expect(fieldReportList.state.getCurrent('job.activeJob')).toEqual({id: '7', jobCode: '17'});
	});
	it('should run onAdd', () => {

		fieldReportList.onAdd()  		
		expect(fieldReportList.state.getCurrent('job.activeJob')).toEqual({});
	});
	it('should run onMenuChange', () => {

		fieldReportList.onMenuChange({id: '7', jobCode: '17'})  		
		expect(fieldReportList.state.getCurrent('job.activeJob')).toEqual({});
	});
	it('should run createFieldReportMenu undefined', () => {

		fieldReportList.createFieldReportMenu({id: '7', jobCode: '17'})  		
		expect(fieldReportList.state.getCurrent('menu.componentMenuAddChild')).toEqual(undefined);
	});
	it('should run createFieldReportMenu', () => {

		fieldReportList.createFieldReportMenu(fieldReport)  		
		expect(fieldReportList.state.getCurrent('menu.componentMenuAddChild')).toEqual({ reportPath: 'field-report-detail/notes/0913a059-fff1-4ca5-895d-e5ef24a160e0/Photo/0', title: '12/31/1969, 4:00 PM', categoryId: 'Photo', attributeCount: 1, expandCategory: false, sortField: '0' });
	});
	it('should run ngOnDestroy', () => {

		fieldReportList.ngOnDestroy()  		
		expect(fieldReportList.state.getCurrent('job.activeJob')).toEqual({});
	});

}) 

