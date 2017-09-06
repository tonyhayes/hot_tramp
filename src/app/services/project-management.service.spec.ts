import { ProjectManagementService } from './project-management.service';
import { TRANSLATIONS, TranslateService } from '../translate';
import {} from 'jasmine'
describe('project management service', () => {
	let service: ProjectManagementService;
	const translate = new TranslateService(TRANSLATIONS);

	beforeEach(() => {
		service = new ProjectManagementService( null, null, translate );
	});

	it('should create ProjectManagementService', () => {
		expect(service).toBeDefined();
	});
	// it('baseUrl should be dev', () => {
	// 	expect(service.baseUrl).toBe('https://admin-api-dev.dexchadev.com/');
	// });
	it('jobsUrl should be dev', () => {
		expect(service.jobCodesUrl).toBe('jobs/');
	});
	it('fieldReportCreationUrl should be dev', () => {
		expect(service.fieldReportUrl).toBe('fieldreports/');
	});
	// it('getBaseUrl should be dev', () => {
	// 	expect(service.getBaseUrl()).toBe('https://admin-api-dev.dexchadev.com/');
	// });

});