import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({  name: 'orderBy' })
export class OrderByPipe implements PipeTransform {

    transform(records: Array<any>, args?: any): any {

        return _.orderBy(records, [args.property, args.sortWith || null], [args.direction, args.direction]);

    };
}