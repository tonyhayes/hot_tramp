import reducer, * as fromHero from './hero.reducer';
import { HeroActions } from '../actions';

describe('Hero Reducer', () => {
  	let actions: HeroActions;
  	let state: fromHero.HeroState;

  	beforeEach(() => {
		actions = new HeroActions();
		state = {
	  		id: 1,
	  		name: 'Test'
		};
  	});

  	it('uses an initial state when none is given', () => {
		let result = reducer(undefined, {type: 'SOME ACTION'});
		expect(result.id).toBe(0);
		expect(result.name).toBe('');
  	});
  	it('uses an initial state when RESET_BLANK_HERO is given', () => {
		let result = reducer(undefined, actions.resetBlankHero());
		expect(result.id).toBe(0);
		expect(result.name).toBe('');
  	});
  	it('return payload when GET_HERO_SUCCESS is given', () => {
		let result = reducer(undefined, actions.getHeroSuccess('tony'));
		expect(result).toBe('tony');
  	});
});