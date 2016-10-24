import reducer, * as fromHero from './hero-list.reducer';
import { HeroActions } from '../actions';
import { Hero } from '../models';

describe('Hero-List Reducer', () => {
  	let actions: HeroActions;
  	let HeroListState: Hero[];

  	beforeEach(() => {
		actions = new HeroActions();
		HeroListState = [{
			  		id: 1,
			  		name: 'Test'
				}];
  	});

  	it('uses an initial state when none is given', () => {
		let result = reducer(undefined, {type: 'SOME ACTION'});
		expect(result.length).toBe(0);
  	});
  	it('return payload when LOAD_HEROES_SUCCESS is given', () => {
		let result = reducer(undefined, actions.loadHeroesSuccess(HeroListState);
		expect(result[0].name).toBe('Test');
  	});

});