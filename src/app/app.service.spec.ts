import { AppState } from './app.service';

describe('Service: AppState', () => {
	
	//specs
		it('should return available state', () => {
			const service = new AppState();
			service.set('hero', 'tony')
			const state = service.get('hero');
			expect(state).toContain('tony');
		});
		it('should clone an object', () => {
			const service = new AppState();
			const clonedObj = service.clone({hero: 'tony'})
			expect(clonedObj).toEqual({hero: 'tony'});
		});


}) 

