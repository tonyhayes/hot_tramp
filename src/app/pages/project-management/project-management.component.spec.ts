import { ProjectManagement } from './project-management.component';
import { MenuService } from '../../services';
import { GlobalState } from '../../global.state';
import { TRANSLATIONS, TranslateService } from '../../translate';
import {} from 'jasmine'

describe('ProjectManagement', () => {

	const translateService = new TranslateService(TRANSLATIONS);
	it('should create a translateService', () => {
		expect(translateService).toBeDefined();
	});

	const gs = new GlobalState();
	it('should create a GlobalState', () => {
		expect(gs).toBeDefined();
	});

	const menuService = new MenuService(null)
	it('should create a menuService', () => {
		expect(menuService).toBeDefined();
	});

	const projectManagement = new ProjectManagement(null, gs, translateService, menuService);
	//specs
	it('should create projectManagement', () => {
		expect(projectManagement).toBeDefined();
	});
	it('should create menu', () => {
		expect(projectManagement.menu.length).toEqual(1);
	});
	it('should create navbar', () => {
		expect(projectManagement.navbar.length).toEqual(1);
	});
	it('should create homeRoute', () => {
		expect(projectManagement.homeRoute).toEqual('/project-management/dashboard');
	});
	it('should create fieldMenu', () => {
		expect(projectManagement.fieldMenu.length).toEqual(1);
	});
	it('should create fieldMenu obj', () => {
		expect(projectManagement.fieldMenu[0].children.length).toEqual(0);
	});
	it('should create fieldMenu path', () => {
		expect(projectManagement.fieldMenu[0].path).toEqual('project-management');
	});
  	it('should run ngOnDestroy', () => {

  		projectManagement.ngOnDestroy()  		
    	expect(projectManagement.state.getCurrent('menu.componentMenuClose')).toEqual(true);
  	});

}) 

