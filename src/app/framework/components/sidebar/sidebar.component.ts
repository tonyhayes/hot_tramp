import { 
	Component, ElementRef, HostListener, ViewEncapsulation, Input 
} from '@angular/core';

import { GlobalState } from '../../../global.state';
import { layoutSizes } from '../../../framework';
import * as _ from 'lodash';

@Component({
	selector: 'dc-sidebar',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./sidebar.component.scss'],
	templateUrl: './sidebar.component.html'
})
export class Sidebar {
	@Input() menu: Array<any> = [];
	@Input() componentMenu: Array<any> = [];
	// here we declare which routes we want to use as a menu in our sidebar
	public routes: Array<any> = []; 

	public menuHeight:number;
	public isMenuCollapsed:boolean = false;
	public isMenuShouldCollapsed:boolean = false;


	constructor(private elementRef:ElementRef, private state:GlobalState) {}

	public ngOnInit():void {
		this.state.subscribe('menu.isCollapsed', (isCollapsed) => {
			this.isMenuCollapsed = isCollapsed;
		});
		this.routes = _.cloneDeep(this.menu)
		if (this.shouldMenuCollapse()) {
			this.menuCollapse();
		}
	}

	public ngAfterViewInit():void {
		setTimeout(() => this.updateSidebarHeight());
	}

	@HostListener('window:resize')
	public onWindowResize():void {

		const isMenuShouldCollapsed = this.shouldMenuCollapse();

		if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
			this.menuCollapseStateChange(isMenuShouldCollapsed);
		}
		this.isMenuShouldCollapsed = isMenuShouldCollapsed;
		this.updateSidebarHeight();
	}

	public menuExpand():void {
		this.menuCollapseStateChange(false);
		this.updateSidebarHeight()
	}

	public menuCollapse():void {
		this.menuCollapseStateChange(true);
	}

	public menuCollapseStateChange(isCollapsed:boolean):void {
		this.isMenuCollapsed = isCollapsed;
		this.state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
	}

	public updateSidebarHeight():void {
		if (this.elementRef.nativeElement && this.elementRef.nativeElement.childNodes.length >1) {
			this.menuHeight = this.elementRef.nativeElement.childNodes[1].clientHeight - 66 || 594;
		}else{
			this.menuHeight = 594;			
		}
	}

	private shouldMenuCollapse():boolean {
		return window.innerWidth <= layoutSizes.resWidthCollapseSidebar;
	}
}
