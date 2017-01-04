import { 
	Component, ViewEncapsulation, ViewChild, Input 
} from '@angular/core';

@Component({
  	selector: 'dc-card',
  	styleUrls: ['./card.component.scss'],
  	templateUrl: './card.component.html',
  	encapsulation: ViewEncapsulation.None
})
export class Card {
  	@Input() title:String;
  	@Input() cardClass:String;
}
