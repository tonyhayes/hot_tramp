import { CategoryAdd } from './category-add.component';
import { GlobalState } from '../../../../global.state';
import { TRANSLATIONS, TranslateService } from '../../../../translate';
import {} from 'jasmine'

describe('CategoryAdd', () => {

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
		loadCategories: ()=>{}		
	}
	const categoryAdd = new CategoryAdd(null, null, null, router, translateService, gs);
	const formData = {jobCode: 12, forDay: 'tony'};
	CategoryAdd.pmStore = pmStore;
	CategoryAdd.pmActions = pmActions;
	//specs
	it('should create CategoryAdd', () => {
		expect(categoryAdd).toBeDefined();
	});
	it('should create homeRoute', () => {
		expect(categoryAdd.homeRoute).toEqual('/project-management-administration/dashboard');
	});
	// it('should run getJob', () => {
	// 	CategoryAdd.getJob();
	// 	expect(CategoryAdd.finished).toEqual(true);
	// });
	it('should run getForm', () => {
		categoryAdd.getForm();
		expect(categoryAdd.finished).toEqual(true)
		expect(categoryAdd.questions.length).toEqual(4)
	});
	it('should run getForm - flag = true', () => {
		categoryAdd.flag = true;
		categoryAdd.getForm();
		expect(categoryAdd.questions.length).toEqual(4)
	});
	it('should run onCancel', () => {
		categoryAdd.onCancel();
		expect(categoryAdd.finished).toEqual(true);
	});
	// it('should run onSubmit', () => {
	// 	categoryAdd.onSubmit(formData);
	// 	expect(categoryAdd.finished).toEqual(true);
	// });
	it('should run isDuplicate - no data - return false', () => {
		
		expect(categoryAdd.isDuplicate('57')).toEqual(false);
	});
	it('should run isDuplicateFieldReport - return false', () => {
		categoryAdd.categories = [{name:7, description: 'tony'},{name:18, description:'abc'}]
		
		expect(categoryAdd.isDuplicate('57')).toEqual(false);
	});
	it('should run isDuplicate - return true', () => {
		categoryAdd.categories = [{name:7, description: 'tony'},{name:18, description:'abc'}]
		
		expect(categoryAdd.isDuplicate(7)).toEqual(true);
	});

}) 


