import { GlobalState } from './global.state';

describe('GlobalState', () => {

	const gs = new GlobalState();
  //specs
	it('should create a GlobalState', () => {
		expect(gs).toBeDefined();
	});
	it('should subscribe to an event', () => {
		gs.subscribe('hero.isTony', (isTony) => {
			this.isTonyYourHero = isTony;
		});
		expect(gs.subscriptions.has('hero.isTony')).toBeTruthy();
		gs.notifyDataChanged('hero.isTony', 'true');
		expect(this.isTonyYourHero).toEqual('true');
		expect(gs.subscriptions.get('hero.isTony')).toBeTruthy();

		gs.notifyDataChanged('hero.isTony', 'false');
		expect(this.isTonyYourHero).toEqual('false');
		gs.onEvent({event: 'hero.isTony', data: 'true'});
		expect(this.isTonyYourHero).toEqual('true');

		gs.notify('hero.isTony', 'who-knows');
		expect(this.isTonyYourHero).toEqual('who-knows');

		expect(gs.getCurrent('hero.isTony')).toEqual('who-knows');

		gs.notifyAndForget('hero.isTony', 'false');
		expect(this.isTonyYourHero).toEqual('false');
		gs.onEvent({event: 'hero.isTony', data: 'true'});
		expect(this.isTonyYourHero).toEqual('true');

		expect(gs.getCurrent('hero.isTony')).toEqual(null);
	});

}) 

