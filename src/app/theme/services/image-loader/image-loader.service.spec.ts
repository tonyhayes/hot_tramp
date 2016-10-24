import { ImageLoaderService } from './image-loader.service';

describe('ImageLoaderService', () => {
	// provide our implementations or mocks to the dependency injector

	const il = new ImageLoaderService();
	  
  	//specs
	it('should have a ImageLoaderService', () => {
		console.log(il)
		expect(il).toBeDefined();
	});

}) 

