import { Pipe, PipeTransform } from '@angular/core';
import { layoutPaths } from '../../../theme';
import Util from '../../helpers/util';

@Pipe({name: 'profilePicture'})
export class ProfilePicturePipe implements PipeTransform {

  transform(input:string, ext = 'png'):string {
    if (!Util.isString(input)){
    	throw new Error('Requires a String as input');    	
    } 
    return layoutPaths.images.profile + input + '.' + ext;
  }
}
