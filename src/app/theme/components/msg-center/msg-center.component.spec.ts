// Load the implementations that should be tested
import { MsgCenter } from './msg-center.component';
import { MsgCenterService } from './msg-center.service';

describe('MsgCenter', () => {
	// provide our implementations or mocks to the dependency injector
	const mcs = new MsgCenterService();
	const mc = 	new	MsgCenter(mcs);


	it('should define MsgCenter', () => {
	  	expect(MsgCenter).toBeDefined();
	});
	it('should construct MsgCenter', () => {
	  	expect(mc).toBeDefined();
	});
	it('should have notifications', () => {
	  	expect(mc.notifications.length).toEqual(7);
	});
	it('should have messages', () => {
	  	expect(mc.messages.length).toEqual(7);
	});

});