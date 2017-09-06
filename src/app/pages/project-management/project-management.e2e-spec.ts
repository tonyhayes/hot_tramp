import { browser, by, element } from 'protractor';

describe('App', () => {

	beforeEach(() => {
		browser.get('http://localhost:7000/project-management/dashboard');
		browser.sleep(2000)
	});


	it('should have a title', () => {
		let subject = browser.getTitle();
		let result  = 'Dexter + Chaney';
		expect(subject).toEqual(result);
	});

	it('should have header', () => {
		let subject = element(by.css('h1')).isPresent();
		let result  = false;
		expect(subject).toEqual(result);
	});

	it('should have <main>', () => {
		let subject = element(by.css('app main')).isPresent();
		let result  = true;
		expect(subject).toEqual(result);
	});



});