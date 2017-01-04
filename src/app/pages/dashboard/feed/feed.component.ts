import { Component, ViewEncapsulation } from '@angular/core';

import { FeedService } from './feed.service';

@Component({
	selector: 'feed',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./feed.scss'],
	templateUrl: './feed.html'
})
export class Feed {

	public feed:Array<Object>;

	constructor(private feedService:FeedService) {}

	ngOnInit() {
		this.loadFeed();
	}

	expandMessage (message){
		message.expanded = !message.expanded;
	}

	private loadFeed() {
		this.feed = this.feedService.getData();
	}
}
