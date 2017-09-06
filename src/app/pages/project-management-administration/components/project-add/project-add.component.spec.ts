import { ProjectAdd } from './project-add.component';
import { GlobalState } from '../../../../global.state';
import { TRANSLATIONS, TranslateService } from '../../../../translate';
import {} from 'jasmine'

describe('ProjectAdd', () => {

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
		loadProjects: ()=>{}		
	}
	const projectAdd = new ProjectAdd(null, null, null, router, translateService, gs);
	const projects = {name: 12, description: 'tony'};
	projectAdd.pmStore = pmStore;
	projectAdd.pmActions = pmActions;
	//specs
	it('should create ProjectAdd', () => {
		expect(projectAdd).toBeDefined();
	});
	it('should create homeRoute', () => {
		expect(projectAdd.homeRoute).toEqual('/project-management-administration/dashboard');
	});
	// it('should run getJob', () => {
	// 	ProhectAdd.getJob();
	// 	expect(ProhectAdd.finished).toEqual(true);
	// });
	it('should run getForm', () => {
		projectAdd.getForm();
		expect(projectAdd.finished).toEqual(true)
		expect(projectAdd.questions.length).toEqual(7)
	});
	it('should run getForm - flag = true', () => {
		projectAdd.flag = true;
		projectAdd.getForm();
		expect(projectAdd.questions.length).toEqual(7)
	});
	it('should run onCancel', () => {
		projectAdd.onCancel();
		expect(projectAdd.finished).toEqual(true);
	});
	// it('should run onSubmit', () => {
	// 	projectAdd.onSubmit(projects);
	// 	expect(projectAdd.finished).toEqual(true);
	// });
	it('should run isDuplicate - no data - return false', () => {
		
		expect(projectAdd.isDuplicate('57')).toEqual(false);
	});
	it('should run isDuplicate - return false', () => {
		projectAdd.projects = [{name:7, description: 'tony'},{name:18, description:'abc'}]
		
		expect(projectAdd.isDuplicate('57')).toEqual(false);
	});
	it('should run isDuplicate - return true', () => {
		projectAdd.projects = [{name:7, description: 'tony'},{name:18, description:'abc'}]
		
		expect(projectAdd.isDuplicate(7)).toEqual(true);
	});

}) 


