import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class GlobalState {

	private data = new Subject<Object>();
	private dataStream$ = this.data.asObservable();

	private subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

	constructor() {
		this.dataStream$.subscribe((data) => this.onEvent(data));
	}

	notifyDataChanged(event, value) {

		let current = this.data[event];
		if (current !== value) {
			this.data[event] = value;

			this.data.next({
				event: event,
				data: this.data[event]
			});
		}
	}
	notify(event, value) {

		this.data[event] = value;

		this.data.next({
			event: event,
			data: this.data[event]
		});		
	}
	notifyAndForget(event, value) {

		this.data[event] = value;

		this.data.next({
			event: event,
			data: this.data[event]
		});	
		this.data[event] = null;	
	}

	subscribe(event: string, callback: Function) {
		let subscribers = this.subscriptions.get(event) || [];
		subscribers.push(callback);

		this.subscriptions.set(event, subscribers);
	}

	onEvent(data: any) {
		let subscribers = this.subscriptions.get(data['event']) || [];

		subscribers.forEach((callback) => {
			callback.call(null, data['data']);
		});
	}
	
	getCurrent(event: any) {
		return this.data[event];;
	}

}
