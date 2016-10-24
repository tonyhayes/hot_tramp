describe('App', () => {

	beforeEach(() => {
		browser.get('/');
	});


	it('should have a title', () => {
		let subject = browser.getTitle();
		let result  = 'Dashboard';
		expect(subject).toEqual(result);
	});

	it('should have header', () => {
		let subject = element(by.css('h1')).isPresent();
		let result  = true;
		expect(subject).toEqual(result);
	});

	it('should have <main>', () => {
		let subject = element(by.css('app main')).isPresent();
		let result  = true;
		expect(subject).toEqual(result);
	});

	it('should have title', () => {
		let subject = element(by.css('.al-title')).getText();
		let result  = 'DASHBOARD';
		expect(subject).toEqual(result);
	});

});