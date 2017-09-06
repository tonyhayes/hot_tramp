import { Pages } from './pages.component';
import {} from 'jasmine'

describe('Pages', () => {

  	const page = new Pages();
  	//specs
  	it('should create Pages', () => {
    	expect(page).toBeDefined();
  	});
	it('should create homeRoute', () => {
		expect(page.homeRoute).toEqual('/user-administration/user-list');
	});
	it('should create menu', () => {
		expect(page.menu.length).toEqual(1);
	});
	it('should create navbar', () => {
		expect(page.navbar.length).toEqual(1);
	});

}) 

