import { Pipe, PipeTransform } from '@angular/core';
import { layoutPaths } from '../../../theme';
import Util from '../../helpers/util';

@Pipe({name: 'appPicture'})
export class AppPicturePipe implements PipeTransform {

  	transform(input:string):string {
    	if (!Util.isString(input)){
    		throw new Error('Requires a String as input');    	
    	} 
    	return layoutPaths.images.root + input;
  	}
}
