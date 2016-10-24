//Load the implementations that should be tested
import { Card } from './card.component';

describe('Card', () => {
	// provide our implementations or mocks to the dependency injector

	const card = new Card();
	it('should define Card', () => {
	  	expect(Card).toBeDefined();
	});
	it('should create card', () => {
	  	expect(card).toBeDefined();
	});


});