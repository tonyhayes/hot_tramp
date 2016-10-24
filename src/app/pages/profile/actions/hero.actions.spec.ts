import { HeroActions } from './hero.actions';

describe('Hero Actions', () => {
	let actions: HeroActions;
	let state: fromHero.HeroState;

	beforeEach(() => {
		actions = new HeroActions();
			state = {
			id: 1,
			name: 'Test'
		};
	});

	it('returns LOAD_HEROES', () => {
		expect(actions.loadHeroes().type).toEqual('[Hero] Load Heroes');
	});
	it('returns LOAD_HEROES_SUCCESS', () => {
		expect(actions.loadHeroesSuccess().type).toEqual('[Hero] Load Heroes Success');
	});
	it('returns GET_HERO', () => {
		expect(actions.getHero('tony').type).toEqual('[Hero] Get Hero');
		expect(actions.getHero('tony').payload).toEqual('tony');
	});
	it('returns GET_HERO_SUCCESS', () => {
		expect(actions.getHeroSuccess('tony').type).toEqual('[Hero] Get Hero Success');
		expect(actions.getHeroSuccess('tony').payload).toEqual('tony');
	});
	it('returns RESET_BLANK_HERO', () => {
		expect(actions.resetBlankHero().type).toEqual('[Hero] Reset Blank Hero');
	});
	it('returns SAVE_HERO', () => {
		expect(actions.saveHero('tony').type).toEqual('[Hero] Save Hero');
		expect(actions.saveHero('tony').payload).toEqual('tony');
	});
	it('returns SAVE_HERO_SUCCESS', () => {
		expect(actions.saveHeroSuccess('tony').type).toEqual('[Hero] Save Hero Success');
		expect(actions.saveHeroSuccess('tony').payload).toEqual('tony');
	});
	it('returns ADD_HERO', () => {
		expect(actions.addHero('tony').type).toEqual('[Hero] Add Hero');
		expect(actions.addHero('tony').payload).toEqual('tony');
	});
	it('returns ADD_HERO_SUCCESS', () => {
		expect(actions.addHeroSuccess('tony').type).toEqual('[Hero] Add Hero Success');
		expect(actions.addHeroSuccess('tony').payload).toEqual('tony');
	});
	it('returns DELETE_HERO', () => {
		expect(actions.deleteHero('tony').type).toEqual('[Hero] Delete Hero');
		expect(actions.deleteHero('tony').payload).toEqual('tony');
	});
	it('returns DELETE_HERO_SUCCESS', () => {
		expect(actions.deleteHeroSuccess('tony').type).toEqual('[Hero] Delete Hero Success');
		expect(actions.deleteHeroSuccess('tony').payload).toEqual('tony');
	});
});