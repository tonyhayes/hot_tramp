import { Injectable } from '@angular/core';
import { GlobalState } from '../../../global.state';
import * as localForage from 'localforage';

@Injectable()
export class HeartbeatService {

	protected online = true;

	constructor(private state:GlobalState) {}

	public monitor(exit?):void {
		if ('onLine' in navigator) {
			setTimeout(() => {
		        if (exit) {
		          return;
		        }
				this.networkCheck();
				this.monitor();
			}, 2000);
		}
	}
	private networkCheck():void {
		if(navigator.onLine != this.online){
			this.online = navigator.onLine;
			this.state.notifyDataChanged('network.online', this.online);
		}

	}
	public networkOnline():boolean {
		if('onLine' in navigator){
			return navigator.onLine;
		}
		return true
	}
   	public getStoredValue(key, fn):any{

		return localForage.getItem(key);
   	}
   	public setStoredValue(key, value){

	  	localForage.setItem(key, value);

   	}
}
