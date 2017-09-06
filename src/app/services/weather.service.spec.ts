import { WeatherService } from './weather.service';
import { TRANSLATIONS, TranslateService } from '../translate';
import {} from 'jasmine'
describe('WeatherService service', () => {
	let service: WeatherService;
	const translate = new TranslateService(TRANSLATIONS);

	beforeEach(() => {
		service = new WeatherService( null );
	});

	it('should create WeatherService', () => {
		expect(service).toBeDefined();
	});

});