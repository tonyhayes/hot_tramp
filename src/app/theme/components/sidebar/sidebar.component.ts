import { 
	Component, ElementRef, HostListener, ViewEncapsulation 
} from '@angular/core';

import { GlobalState } from '../../../global.state';
import { layoutSizes } from '../../../theme';
import { MENU } from '../../../../app/app.menu';
import * as _ from 'lodash';

@Component({
  	moduleId: module.id,
	selector: 'dc-sidebar',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['sidebar.component.scss'],
	templateUrl: 'sidebar.component.html'
})
export class Sidebar {

	// here we declare which routes we want to use as a menu in our sidebar
	public routes = _.cloneDeep(MENU); // we're creating a deep copy since we are going to change that object

	public menuHeight:number;
	public isMenuCollapsed:boolean = false;
	public isMenuShouldCollapsed:boolean = false;


	constructor(private elementRef:ElementRef, private state:GlobalState) {

		this.state.subscribe('menu.isCollapsed', (isCollapsed) => {
			this.isMenuCollapsed = isCollapsed;
		});
	}

	public ngOnInit():void {
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
	}

	public menuCollapse():void {
		this.menuCollapseStateChange(true);
	}

	public menuCollapseStateChange(isCollapsed:boolean):void {
		this.isMenuCollapsed = isCollapsed;
		this.state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
	}

	public updateSidebarHeight():void {
		// TODO: get rid of magic 84 constant
		this.menuHeight = this.elementRef.nativeElement.childNodes[0].clientHeight - 84;
	}

	private shouldMenuCollapse():boolean {
		return window.innerWidth <= layoutSizes.resWidthCollapseSidebar;
	}
}
