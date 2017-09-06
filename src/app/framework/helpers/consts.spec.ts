
import { Consts } from './consts';

describe(' helper consts', () => {

  	//specs
	it('should have STRING_COMPARATOR_FUNCTION', () => {
		expect(Consts.STRING_COMPARATOR_FUNCTION).toBeDefined();
		expect(Consts.STRING_COMPARATOR_FUNCTION).toEqual('stringComparator');
	});
	it('should have dev', () => {
		expect(Consts.dev).toBeDefined();
		expect(Consts.dev.API_REST_URL).toBeDefined();
		expect(Consts.dev.CLIENT_ID).toBeDefined();
		expect(Consts.dev.APP_TITLE).toBeDefined();
		expect(Consts.dev.APP_NAME).toBeDefined();
	});
	it('should have pmdev', () => {
		expect(Consts.pmdev).toBeDefined();
		expect(Consts.pmdev.API_REST_URL).toBeDefined();
		expect(Consts.pmdev.CLIENT_ID).toBeDefined();
		expect(Consts.pmdev.APP_TITLE).toBeDefined();
		expect(Consts.pmdev.APP_NAME).toBeDefined();
	});
	it('should have pmqa', () => {
		expect(Consts.pmqa).toBeDefined();
		expect(Consts.pmqa.API_REST_URL).toBeDefined();
		expect(Consts.pmqa.CLIENT_ID).toBeDefined();
		expect(Consts.pmqa.APP_TITLE).toBeDefined();
		expect(Consts.pmqa.APP_NAME).toBeDefined();
	});
	it('should have pm', () => {
		expect(Consts.pm).toBeDefined();
		expect(Consts.pm.API_REST_URL).toBeDefined();
		expect(Consts.pm.CLIENT_ID).toBeDefined();
		expect(Consts.pm.APP_TITLE).toBeDefined();
		expect(Consts.pm.APP_NAME).toBeDefined();
	});

	it('should have admindev', () => {
		expect(Consts.admindev).toBeDefined();
		expect(Consts.admindev.API_REST_URL).toBeDefined();
		expect(Consts.admindev.CLIENT_ID).toBeDefined();
		expect(Consts.admindev.APP_TITLE).toBeDefined();
		expect(Consts.admindev.APP_NAME).toBeDefined();
	});
	it('should have pm', () => {
		expect(Consts.pm).toBeDefined();
		expect(Consts.pm.API_REST_URL).toBeDefined();
		expect(Consts.pm.CLIENT_ID).toBeDefined();
		expect(Consts.pm.APP_TITLE).toBeDefined();
		expect(Consts.pm.APP_NAME).toBeDefined();
	});
	it('should have adminqa', () => {
		expect(Consts.adminqa).toBeDefined();
		expect(Consts.adminqa.API_REST_URL).toBeDefined();
		expect(Consts.adminqa.CLIENT_ID).toBeDefined();
		expect(Consts.adminqa.APP_TITLE).toBeDefined();
		expect(Consts.adminqa.APP_NAME).toBeDefined();
	});
	it('should have admin', () => {
		expect(Consts.admin).toBeDefined();
		expect(Consts.admin.API_REST_URL).toBeDefined();
		expect(Consts.admin.CLIENT_ID).toBeDefined();
		expect(Consts.admin.APP_TITLE).toBeDefined();
		expect(Consts.admin.APP_NAME).toBeDefined();
	});

}) 

