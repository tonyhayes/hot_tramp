// Load the implementations that should be tested
import { MsgCenterService } from './msg-center.service';

describe('MsgCenterService', () => {
	// provide our implementations or mocks to the dependency injector
	const mcs = new MsgCenterService();


	it('should define MsgCenterService', () => {
	  	expect(MsgCenterService).toBeDefined();
	});
	it('should construct MsgCenterService', () => {
	  	expect(mcs).toBeDefined();
	});
	it('should have notifications', () => {
	  	expect(mcs.notifications.length).toEqual(7);
	});
	it('should have notifications', () => {
	  	expect(mcs.messages.length).toEqual(7);
	});
	it('should have messages - getNotifications', () => {
	  	expect(mcs.getNotifications().length).toEqual(7);
	});
	it('should have notifications - getMessages', () => {
	  	expect(mcs.getMessages().length).toEqual(7);
	});


});