import { Component, Input, ContentChildren, QueryList, forwardRef, ViewEncapsulation } from '@angular/core';
import { AccordionItem } from './accordion-item.component';
import { Subscription } from 'rxjs/Subscription';

import { GlobalState } from '../../../global.state';

@Component({
    selector: 'dc-accordion',
    styleUrls: [ './accordion.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="dc-accordion">
            <ng-content></ng-content>
        </div>
    `
})
export class Accordion {
    
    @Input() multiple: boolean = true;
    activeAccordionItem

    @ContentChildren(forwardRef(() => AccordionItem)) items: QueryList<AccordionItem>;
    
    constructor(public state:GlobalState) {}
    ngOnInit() {
        this.state.subscribe('accordion.activeItem', (activeItem) => {
            if(!activeItem){
                return
            }
            this.items.toArray().forEach(i => { 
                if (i.itemName !== activeItem.itemName) {
                    i.applyNewToggle(true)
                }else{
                    i.applyNewToggle(false)

                }
            });
        });

    }
   
    didItemToggled(item: AccordionItem) {
        // on not multiple, it will collpase the rest of items
        if (!this.multiple) {
            this.items.toArray().forEach(i => { 
                if (i !== item) {
                    i.applyToggle(true)
                }
            });
        }
    }

}