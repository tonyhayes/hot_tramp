import { FormAdd } from './form-add.component';
import { GlobalState } from '../../../../global.state';
import { TRANSLATIONS, TranslateService } from '../../../../translate';
import {} from 'jasmine'

describe('form Add', () => {

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
	const formAdd = new FormAdd(null, null, null, router, translateService, gs);
	formAdd.pmStore = pmStore;
	formAdd.pmActions = pmActions;
	//specs
	it('should create FormAdd', () => {
		expect(formAdd).toBeDefined();
	});
	it('should create homeRoute', () => {
		expect(formAdd.homeRoute).toEqual('/project-management-administration/dashboard');
	});
	// it('should run getJob', () => {
	// 	FormAdd.getJob();
	// 	expect(FormAdd.finished).toEqual(true);
	// });
	it('should run getForm', () => {
		formAdd.buildForm();
		expect(formAdd.finished).toEqual(true)
		expect(formAdd.questions.length).toEqual(3)
	});
	it('should run getForm - flag = true', () => {
		formAdd.flag = true;
		formAdd.buildForm();
		expect(formAdd.questions.length).toEqual(3)
	});
	it('should run onCancel', () => {
		formAdd.onCancel();
		expect(formAdd.finished).toEqual(true);
	});
	// it('should run onSubmit', () => {
	// 	formAdd.onSubmit(formData);
	// 	expect(formAdd.finished).toEqual(true);
	// });
	it('should run isDuplicate - no data - return false', () => {
		
		expect(formAdd.isDuplicate('57')).toEqual(false);
	});
	it('should run isDuplicate - return false', () => {
		formAdd.forms = [{name:7, description: 'tony'},{name:18, description:'abc'}]
		
		expect(formAdd.isDuplicate('57')).toEqual(false);
	});
	it('should run isDuplicate - return true', () => {
		formAdd.forms = [{name:7, description: 'tony'},{name:18, description:'abc'}]
		
		expect(formAdd.isDuplicate(7)).toEqual(true);
	});

}) 


