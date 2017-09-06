// Load the implementations that should be tested
import { ContentTop } from './content-top.component';
import { GlobalState } from '../../../global.state';

describe('ContentTop', () => {
	// provide our implementations or mocks to the dependency injector
	const gs = new GlobalState();


	it('should define ContentTop', () => {
	  	expect(ContentTop).toBeDefined();
	});

	it('should construct a ContentTop', () => {
		const contentTop = new ContentTop(gs);
	  	expect(contentTop.activePageTitle).toEqual('');
	});

});