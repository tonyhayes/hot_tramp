import { FieldReportHeader } from './field-report-header.component';
import { GlobalState } from '../../../../../../global.state';
import { TRANSLATIONS, TranslateService } from '../../../../../../translate';
import {} from 'jasmine'

describe('Report Header', () => {

	const translateService = new TranslateService(TRANSLATIONS);
	it('should create a translateService', () => {
		expect(translateService).toBeDefined();
	});

	const gs = new GlobalState();
	it('should create a GlobalState', () => {
		expect(gs).toBeDefined();
	});

	const router = {
		navigate: ()=>{}		
	}
	const pmStore = {
		dispatch: ()=>{},		
		select: ()=>{
		  return {subscribe: ()=> {}}
		}		
	}
	const pmActions = {
		addFieldReport: ()=>{},		
		loadJobCategories: ()=>{}		
	}
	const fieldReportHeader = new FieldReportHeader(null, null, null, router, translateService, gs);
	fieldReportHeader.user = {id: 12, name: 'tony'};
	const formData = {jobCode: 12, forDay: 'tony'};
	fieldReportHeader.pmStore = pmStore;
	fieldReportHeader.pmActions = pmActions;
	//specs
	it('should create fieldReportHeader', () => {
		expect(fieldReportHeader).toBeDefined();
	});
	it('should create homeRoute', () => {
		expect(fieldReportHeader.homeRoute).toEqual('/project-management/dashboard');
	});
	// it('should run getJob', () => {
	// 	fieldReportHeader.getJob();
	// 	expect(fieldReportHeader.finished).toEqual(true);
	// });
	it('should run getForm', () => {
		fieldReportHeader.getForm();
		expect(fieldReportHeader.finished).toEqual(true)
		expect(fieldReportHeader.questions.length).toEqual(2)
	});
	it('should run getForm - flag = true', () => {
		fieldReportHeader.flag = true;
		fieldReportHeader.getForm();
		expect(fieldReportHeader.questions.length).toEqual(3)
	});
	it('should run onCancel', () => {
		fieldReportHeader.onCancel();
		expect(fieldReportHeader.finished).toEqual(true);
	});
	it('should run onSubmit', () => {
		fieldReportHeader.onSubmit(formData);
		expect(fieldReportHeader.finished).toEqual(true);
	});
	it('should run isDuplicateFieldReport - no data - return false', () => {
		
		expect(fieldReportHeader.isDuplicateFieldReport('formData', '57')).toEqual(false);
	});
	it('should run isDuplicateFieldReport - return false', () => {
		fieldReportHeader.fieldReportSummary = [{jobCode:7, forDay: 'tony'},{jobCode:18, forDay:'abc'}]
		
		expect(fieldReportHeader.isDuplicateFieldReport('formData', '57')).toEqual(false);
	});
	it('should run isDuplicateFieldReport - return true', () => {
		fieldReportHeader.fieldReportSummary = [{jobCode:7, forDay: 'tony'},{jobCode:18, forDay:'abc'}]
		
		expect(fieldReportHeader.isDuplicateFieldReport(7, 'tony')).toEqual(true);
	});

}) 


