import { loadWeatherReducer  } from './weather-load.reducer';
import { WeatherActions } from '../../actions';

describe('loadWeatherReducer Reducer', () => {
	let actions: WeatherActions;
	let loadWeatherState: any[] = [];

	beforeEach(() => {
		actions = new WeatherActions();
		loadWeatherState = [{
					applicationId: 'Test',
					totalCount: 5,
					licensesUsed: 2,

				}];
	});

	it('uses an initial state when none is given', () => {
		let result = loadWeatherReducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
	});
	it('return payload when loadCategoriesSuccess is given', () => {
		let result = loadWeatherReducer(undefined, actions.loadWeatherSuccess(loadWeatherState));
		expect(result[0].applicationId).toBe('Test');
	})
	it('return payload when loadCategoriesFailure is given', () => {
		let result = loadWeatherReducer(undefined, actions.loadWeatherFailure('error'));        
		expect(result).toEqual('error');
	});

});