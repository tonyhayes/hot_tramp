import { UserAdministration } from './user-administration.component';

describe('UserAdministration', () => {

  	const userAdministration = new UserAdministration(null);
  	//specs
  	it('should create userAdministration', () => {
    	expect(userAdministration).toBeDefined();
  	});
  	it('should create menu', () => {
    	expect(userAdministration.menu.length).toEqual(1);
  	});
  	it('should create navbar', () => {
    	expect(userAdministration.navbar.length).toEqual(1);
  	});
  	it('should create homeRoute', () => {
    	expect(userAdministration.homeRoute).toEqual('/user-administration/user-list');
  	});

}) 

