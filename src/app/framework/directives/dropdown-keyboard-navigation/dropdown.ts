import { Directive, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

enum Key {
  	ArrowUp = 38,
  	ArrowDown = 40
}

/**
 * Transforms a node into a dropdown.
 */
@Directive({
  	selector: '[dcDropdown]',
  	exportAs: 'dcDropdown',
  	host: {
		'[class.dropdown]': '!up',
		'[class.dropup]': 'up',
		'[class.show]': 'isOpen()',
		'(keyup.esc)': 'closeFromOutsideEsc()',
		'(document:click)': 'closeFromOutsideClick($event)',
		'(keydown)': 'keyboardEvent($event)'
  	}
})
export class DcDropdown {
  	private _toggleElement: any;
  	private elementRef: any;

  	/**
   	* Indicates that the dropdown should open upwards
   	*/
  	@Input() up: boolean;

  	/**
   	* Indicates that dropdown should be closed when selecting one of dropdown items (click) or pressing ESC.
   	*/
  	@Input() autoClose: boolean;

  	/**
   	*  Defines whether or not the dropdown-menu is open initially.
   	*/
  	@Input('open') _open = false;

  	/**
   	*  An event fired when the dropdown is opened or closed.
   	*  Event's payload equals whether dropdown is open.
   	*/
  	@Output() openChange = new EventEmitter();

  	constructor(config: NgbDropdownConfig, elementRef: ElementRef) {
		this.up = config.up;
		this.autoClose = config.autoClose;
		this.elementRef = elementRef;
  	}


  	/**
   	* Checks if the dropdown menu is open or not.
   	*/
  	isOpen(): boolean { return this._open; }

  	/**
   	* Opens the dropdown menu of a given navbar or tabbed navigation.
   	*/
  	open(): void {
		if (!this._open) {
	  		this._open = true;
	  		this.openChange.emit(true);
		}
  	}

  	/**
   	* Closes the dropdown menu of a given navbar or tabbed navigation.
   	*/
  	close(): void {
		if (this._open) {
	  		this._open = false;
	  		if (this._toggleElement) {
				this._toggleElement.focus();
	  		}
	  		this.openChange.emit(false);
		}
  	}

  	/**
   	* Toggles the dropdown menu of a given navbar or tabbed navigation.
   	*/
  	toggle(): void {
		if (this.isOpen()) {
	  		this.close();
		} else {
	  		this.open();
		}
  	}

  	closeFromOutsideClick($event) {
		if (this.autoClose && $event.button !== 2 && !this._isEventFromToggle($event)) {
	  		this.close();
		}
  	}

  	closeFromOutsideEsc() {
		if (this.autoClose) {
	  		this.close();
		}
  	}

  	getActiveElmIndex(list): number {
		let i = 0;
		let position: number = -1;

		for (let elm of list) {
	  		if (elm === document.activeElement) {
				position = i;
	  		}
	  		i++;
		}	
		return position;
  	}


  	keyboardEvent($event): boolean {
		if ([Key.ArrowDown, Key.ArrowUp].indexOf($event.which) === -1) {
	  		return true;
		}

		if (!this.isOpen()) {
	  		this.open();
		}

		if (!this._toggleElement) {
	  	return true;
		}

		let list: HTMLElement[] = this._toggleElement.nextElementSibling.children;

		let position: number = this.getActiveElmIndex(list);

		switch ($event.which) {
	  		case Key.ArrowDown:
				position++;
			break;
	  		case Key.ArrowUp:
				position--;
			break;
		}

		if (position >= list.length) {
	  		position = list.length - 1;
		}

		if (position < 0) {
	  		position = 0;
		}

		let elm: HTMLElement = list[position];

		if (elm) {
	  		elm.focus();
	  		return false;
		} else {
	  		return true;
		}
  	}


  	/**
   	* @internal
   	*/
  	set toggleElement(toggleElement: any) { this._toggleElement = toggleElement; }

  	private _isEventFromToggle($event) { return !!this._toggleElement && this._toggleElement.contains($event.target); }
}

/**
 * Allows the dropdown to be toggled via click. This directive is optional.
 */
@Directive({
  	selector: '[dcDropdownToggle]',
  	host: {
		'class': 'dropdown-toggle',
		'aria-haspopup': 'true',
		'[attr.aria-expanded]': 'dropdown.isOpen()',
		'(click)': 'toggleOpen()'
  	}
})
export class DcDropdownToggle {
  	constructor(public dropdown: DcDropdown, elementRef: ElementRef) {
		dropdown.toggleElement = elementRef.nativeElement;
  	}

  	toggleOpen() { this.dropdown.toggle(); }
}