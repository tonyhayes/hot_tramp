
import Consts from './consts';

describe(' helper consts', () => {

  //specs
	it('should have STRING_COMPARATOR_FUNCTION', () => {
		expect(Consts.STRING_COMPARATOR_FUNCTION).toBeDefined();
		expect(Consts.STRING_COMPARATOR_FUNCTION).toEqual('stringComparator');
	});


}) 

