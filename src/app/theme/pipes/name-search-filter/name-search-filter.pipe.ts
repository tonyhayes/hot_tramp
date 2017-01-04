import { Pipe, PipeTransform } from '@angular/core';
import { layoutPaths } from '../../../theme';
import Util from '../../helpers/util';

@Pipe({ name: 'nameSearchFilter', pure: false })
export class NameSearchFilterPipe implements PipeTransform {

	 transform(items:any[], args:any):any[] {
		var isSearch = (data:any): boolean => {
			if(!args){
				return true;
			}
			var isAll = false;
			if(typeof data === 'object' ){
				for (var z in data) {
					if(isAll = isSearch(data[z]) ){
						break;
					}
				}
			} else {
				if(typeof args === 'number'){
					isAll = data === args;
				} else {
					isAll = data.toString().match( new RegExp(args, 'i') );
				}
			} 

			return isAll;
		};

		return items.filter(isSearch);
	}

}
