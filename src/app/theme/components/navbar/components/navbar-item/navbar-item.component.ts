import { 
	Component, ViewEncapsulation, Input, Output, EventEmitter 
} from '@angular/core';

@Component({
	selector: 'dc-navbar-item',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./navbar-item.component.scss'],
	templateUrl: './navbar-item.component.html',
})
export class NavbarItem {

	@Input() navbarItem:any;

}
