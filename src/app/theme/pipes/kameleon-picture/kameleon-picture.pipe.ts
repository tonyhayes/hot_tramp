import { Pipe, PipeTransform } from '@angular/core';
import { layoutPaths } from '../../../theme';
import Util from '../../helpers/util';

@Pipe({name: 'kameleonPicture'})
export class KameleonPicturePipe implements PipeTransform {

  transform(input:string):string {
    if (!Util.isString(input)){
    	throw new Error('Requires a String as input');    	
    } 
    return layoutPaths.images.root + 'theme/icon/kameleon/' + input + '.svg';
  }
}
