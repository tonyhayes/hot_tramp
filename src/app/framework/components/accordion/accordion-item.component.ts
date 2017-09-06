import { Component, ContentChild, Input, Inject, forwardRef } from '@angular/core';
import { AccordionItemBody } from './accordion-item-body.component';
import { Accordion } from './accordion.component';

@Component({
    selector: 'dc-accordion-item',
    template: `
        <div class="dc-accordion-item" [ngClass]="{'is-collapsed': collapsed}">
            <ng-content></ng-content>
        </div>
    `
})
export class AccordionItem {

    private accordion:Accordion;

    @Input() public collapsed: boolean = true;
    @Input() public openItem: boolean = false;
    @Input() public itemName = null;
    
    @ContentChild(AccordionItemBody) body: AccordionItemBody;

    constructor(@Inject(forwardRef(() => Accordion)) accordion: Accordion) {
        this.accordion = accordion;
    }

    ngAfterViewInit() {
        if(this.openItem){
            this.applyToggle(!this.collapsed);
            return
        }
        this.body.toggle(this.collapsed);
    }
    toggle(collapsed: boolean) {
        this.accordion.didItemToggled(this);
        this.applyToggle(collapsed);
    }
    
    applyToggle(collapsed: boolean) {
        // if(this.collapsed == collapsed){
        //     return;
        // }
        this.collapsed = collapsed;
        this.body.toggle(collapsed);
    }
    applyNewToggle(collapsed: boolean) {
        if(this.collapsed == collapsed){
            return;
        }
        this.collapsed = collapsed;
        this.body.toggle(collapsed);
    }


}