import { ProjectManagementAdministration } from './project-management-administration.component';
import { GlobalState } from '../../global.state';
import { TRANSLATIONS, TranslateService } from '../../translate';
import {} from 'jasmine'

describe('ProjectManagementAdministration', () => {

	const translateService = new TranslateService(TRANSLATIONS);
	it('should create a translateService', () => {
		expect(translateService).toBeDefined();
	});

	const gs = new GlobalState();
	it('should create a GlobalState', () => {
		expect(gs).toBeDefined();
	});


	const projectManagementAdministration = new ProjectManagementAdministration(null, gs, translateService);
	//specs
	it('should create ProjectManagementAdministration', () => {
		expect(projectManagementAdministration).toBeDefined();
	});
	it('should create menu', () => {
		expect(projectManagementAdministration.menu.length).toEqual(0);
	});
	it('should create navbar', () => {
		expect(projectManagementAdministration.navbar.length).toEqual(1);
	});
	it('should create homeRoute', () => {
		expect(projectManagementAdministration.homeRoute).toEqual('/project-management-administration/dashboard');
	});

}) 

