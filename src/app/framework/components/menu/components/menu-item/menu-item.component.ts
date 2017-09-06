import { 
	Component, ViewEncapsulation, Input, Output, EventEmitter 
} from '@angular/core';
import { GlobalState } from '../../../../../global.state';

@Component({
	selector: 'dc-menu-item',
//	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./menu-item.component.scss'],
	templateUrl: './menu-item.component.html'
})
export class MenuItem {

	@Input() menuItem:any;
	@Input() jobNumber:number;
	@Input() jobId:string;
	@Input() child:boolean = false;

	@Output() itemHover = new EventEmitter<any>();
	@Output() toggleSubMenu = new EventEmitter<any>();
	@Output() childIconClicked = new EventEmitter<any>();

	constructor(public state:GlobalState) {}
	onHoverItem($event):void {
		this.itemHover.emit($event);
	}
	getPath(paths, item):string {
		if(!paths.length || !item){
			return
		}
		if(item.componentType == 'notes') {
			const date:Date = new Date();
			if(paths.length == 4) {
				paths[1] = this.jobId;
				paths[2] = item.id;
				paths[3] = date.getTime();
				return paths;
			}
			paths.push(this.jobId);
			paths.push(item.id);
			paths.push(date.getTime());
			return paths;

		}
		// if(paths.length == 3) {
		// 	paths[1] = this.jobId;
		// 	paths[2] = this.date.getTime();
		// 	return paths;
		// }
		// paths.push(this.jobId);
		// paths.push(this.date.getTime());
		// return paths;
	}

	onToggleSubMenu($event, item):boolean {
		$event.item = item;
		this.toggleSubMenu.emit($event);
		return false;
	}
	onChildIconClick(item) {
		this.childIconClicked.emit(item);
//		return false;
	}

}
