import { HeartbeatService } from './heartbeat.service';
import { GlobalState } from '../../../global.state';

describe('HeartbeatService', () => {
	// provide our implementations or mocks to the dependency injector

	const gs = new GlobalState();
	const hb = new HeartbeatService(gs);
	  
  	//specs
	it('should have a HeartbeatService', () => {
		expect(hb).toBeDefined();
	});
	it('should return true on networkOnline', () => {
		const online = hb.networkOnline();
		expect(online).toEqual(true);
	});
	it('should return true on networkOnline', () => {
		hb.networkCheck();
		expect(hb.online).toEqual(true);
	});
	it('should return from monitor', () => {
		hb.monitor('exit');
		expect(hb.online).toEqual(true);
	});

}) 

