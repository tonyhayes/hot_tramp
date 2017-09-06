import { UserAdministrationService } from './user-administration.service';
import {} from 'jasmine'
describe('question service', () => {
	let service: UserAdministrationService;

	beforeEach(() => {
		service = new UserAdministrationService( null, null );
		service.API_REST_URL = 'https://admin-api-dev.dexchadev.com/'
	});

	it('should create UserAdministrationService', () => {
		expect(service).toBeDefined();
	});
	// it('baseUrl should be dev', () => {
	// 	expect(service.baseUrl).toBe('https://admin-api-dev.dexchadev.com/');
	// });
	it('usersUrl should be dev', () => {
		expect(service.usersUrl).toBe('users/');
	});
	it('licensesUrl should be dev', () => {
		expect(service.licensesUrl).toBe('licenses/');
	});
	// it('getBaseUrl should be dev', () => {
	// expect(service.getBaseUrl()).toBe('https://admin-api-dev.dexchadev.com/');
	// });
	it('saveUser should save object', () => {
	  	service.saveUser('tony')
		expect(service.user).toBe('tony');
	});
	it('getUser should gey object', () => {
	  	service.saveUser('tony')
		expect(service.getUser()).toBe('tony');
	});

});