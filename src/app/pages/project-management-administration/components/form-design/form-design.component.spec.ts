import { FormDesign } from './form-design.component';
import { GlobalState } from '../../../../global.state';
import { TRANSLATIONS, TranslateService } from '../../../../translate';
import {} from 'jasmine'

describe('form design', () => {

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
		loadForms: ()=>{},		
		loadForm: ()=>{}		
	}
	const formDesign = new FormDesign(null, null, null, router, translateService, gs);
	formDesign.pmStore = pmStore;
	formDesign.pmActions = pmActions;
	formDesign.id = 0;
	//specs
	it('should create FormDesign', () => {
		expect(formDesign).toBeDefined();
	});
	it('should create homeRoute', () => {
		expect(formDesign.homeRoute).toEqual('/project-management-administration/dashboard');
	});
	// it('should run getJob', () => {
	// 	FormDesign.getJob();
	// 	expect(FormDesign.finished).toEqual(true);
	// });
	it('should run buildForm', () => {
		formDesign.buildForm();
		expect(formDesign.finished).toEqual(true)
		expect(formDesign.questions.length).toEqual(9)
	});
	it('should run buildForm - flag = true', () => {
		formDesign.flag = true;
		formDesign.buildForm();
		expect(formDesign.questions.length).toEqual(9)
	});
	it('should run onCancel', () => {
		formDesign.onCancel();
		expect(formDesign.finished).toEqual(true);
	});
	// it('should run onSubmit', () => {
	// 	formDesign.onSubmit(formData);
	// 	expect(formDesign.finished).toEqual(true);
	// });
	it('should run isDuplicate - no data - return false', () => {
		
		expect(formDesign.isDuplicate('57')).toEqual(false);
	});
	it('should run isDuplicate - return false', () => {
		formDesign.forms = [{name:7, description: 'tony'},{name:18, description:'abc'}]
		
		expect(formDesign.isDuplicate('57')).toEqual(false);
	});
	it('should run isDuplicate - return true', () => {
		formDesign.forms = [{name:7, description: 'tony'},{name:18, description:'abc'}]
		
		expect(formDesign.isDuplicate(7)).toEqual(true);
	});

}) 


