import { Injectable } from '@angular/core';

@Injectable()
export class ThemePreloader {

	private static loaders:Array<Promise<any>> = [];

	public static registerLoader(method:Promise<any>):void {
		ThemePreloader.loaders.push(method);
	}

	public static clear():void {
		ThemePreloader.loaders = [];
	}

	public static load():Promise<any> {
		return new Promise((resolve, reject) => {
			ThemePreloader.executeAll(resolve);
		});
	}

	private static executeAll(done:Function):void {
		setTimeout(() => {
			Promise.all(ThemePreloader.loaders).then((values) => {
				done.call(null, values);

			}).catch((error) => {
				console.error(error);
			});
		});
	}
}
