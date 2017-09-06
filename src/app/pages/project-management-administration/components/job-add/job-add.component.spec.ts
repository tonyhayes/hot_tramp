import { JobAdd } from './job-add.component';
import { GlobalState } from '../../../../global.state';
import { TRANSLATIONS, TranslateService } from '../../../../translate';
import {} from 'jasmine'

describe('Job Add', () => {

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
		loadJobs: ()=>{}		
	}
	const jobAdd = new JobAdd(null, null, null, router, translateService, gs);
	const jobs = {name: 12, derscription: 'tony'};
	jobAdd.pmStore = pmStore;
	jobAdd.pmActions = pmActions;
	//specs
	it('should create JobAdd', () => {
		expect(jobAdd).toBeDefined();
	});
	it('should create homeRoute', () => {
		expect(jobAdd.homeRoute).toEqual('/project-management-administration/dashboard');
	});
	// it('should run getJob', () => {
	// 	JobAdd.getJob();
	// 	expect(JobAdd.finished).toEqual(true);
	// });
	it('should run getForm', () => {
		jobAdd.getForm();
		expect(jobAdd.finished).toEqual(true)
		expect(jobAdd.questions.length).toEqual(2)
	});
	it('should run getForm - flag = true', () => {
		jobAdd.flag = true;
		jobAdd.getForm();
		expect(jobAdd.questions.length).toEqual(2)
	});
	it('should run onCancel', () => {
		jobAdd.onCancel();
		expect(jobAdd.finished).toEqual(true);
	});
	// it('should run onSubmit', () => {
	// 	jobAdd.onSubmit(formData);
	// 	expect(jobAdd.finished).toEqual(true);
	// });
	it('should run isDuplicate - no data - return false', () => {
		
		expect(jobAdd.isDuplicate('57')).toEqual(false);
	});
	it('should run isDuplicate - return false', () => {
		jobAdd.jobs = [{name:7, derscription: 'tony'},{name:18, derscription:'abc'}]
		
		expect(jobAdd.isDuplicate('formData', '57')).toEqual(false);
	});
	it('should run isDuplicate - return true', () => {
		jobAdd.jobs = [{name:7, derscription: 'tony'},{name:18, derscription:'abc'}]
		
		expect(jobAdd.isDuplicate(7)).toEqual(true);
	});

}) 


