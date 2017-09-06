// app/translate/translate.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../../../translate'; // our translate service
import { Util } from '../../helpers/util';

@Pipe({
    name: 'dcTranslate',
 })

export class TranslatePipe implements PipeTransform {

	constructor(private translate: TranslateService) { }

	transform(value: string, args: any[]): any {
    	if (!Util.isString(value)){
    		throw new Error('Requires a String as input');    	
    	} 
		if (!value) return;
		
		return this.translate.instant(value);
	}
}