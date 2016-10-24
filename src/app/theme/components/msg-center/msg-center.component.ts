import { Component } from '@angular/core';

import { MsgCenterService } from './msg-center.service';

@Component({
  	moduleId: module.id,
	selector: 'dc-msg-center',
	providers: [MsgCenterService],
	styleUrls: ['msg-center.component.scss'],
	templateUrl: 'msg-center.component.html'
})
export class MsgCenter {

	public notifications:Array<Object>;
	public messages:Array<Object>;

	constructor(private msgCenterService:MsgCenterService) {
		this.notifications = this.msgCenterService.getNotifications();
		this.messages = this.msgCenterService.getMessages();
	}

}
