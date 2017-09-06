import { 
	Component, 
	OnInit, 
	forwardRef, 
	Input, 
	Output, 
	EventEmitter, 
	ViewEncapsulation, 
	ChangeDetectorRef,
	ViewChild 
} from '@angular/core';
import { 
	FormGroup, 
	FormControl, 
	ControlValueAccessor, 
	NG_VALUE_ACCESSOR 
} from '@angular/forms';
import { TranslateService } from '../../../../../../translate';
import { Util } from '../../../../../helpers/util';
import { MyDatePicker, IMyOptions, IMyDateModel } from 'mydatepicker';


@Component({
	selector: 'dc-datepicker',
	styleUrls: [ './datepicker.component.scss' ],
	template: `
		<div class="form-control dc-datepicker" [class.focus-in]="focusIn">
			<my-date-picker 
				#mydp="mydatepicker"
				[id]="question.key"
				name="question.key"
				[selDate]="question.value.date"
				[options]="{
					disableUntil: question.minValue, 
					disableSince: question.maxValue, 
					componentDisabled: question.readonly || readonly,
					dateFormat: dateFormat
				}"
				(inputFieldChanged)="saveValue($event)"
				(inputFocusBlur)="onInputFocusBlur($event)"
			>                        	
            </my-date-picker>
        </div>
	`,
//	encapsulation: ViewEncapsulation.None,
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatepickerComponent), multi: true },
	]
})
export class DatepickerComponent implements ControlValueAccessor {
	change = (_: any) => {};
	@Input() question;
	@Input() form: FormGroup;
	@Input() readonly;
	@Output() isValidDate = new EventEmitter<any>();
	_value = null;
	dateFormat;
	dateSeperator;
	focusIn = false;
	done = false;

	onChange: any = () => { this.saveValue };
	onTouched: any = () => { };

	get value() {
		return this._value;
	}

	set value(val) {
		this._value = val;
		this.onChange(val);
		this.onTouched();
	}
// Define the view child variable
    @ViewChild('mydp') mydp: MyDatePicker;

	constructor(private translate: TranslateService, private cdRef:ChangeDetectorRef) {  }
	ngOnInit():void {
		this.dateFormat = this.translate.instant('DATE_FORMAT')
		this.dateSeperator = this.translate.instant('DATE_SEPERATOR')

		if(!this.question.value){
			const nullDate = new Date();
			this.question.value = {'date': { 
				year: nullDate.getFullYear(), 
				month: nullDate.getMonth() + 1, 
				day: nullDate.getDate() } 
			};
			this.question.minValue = {'date': { 
				year: nullDate.getFullYear(), 
				month: nullDate.getMonth() + 1, 
				day: nullDate.getDate() } 
			};
			this.question.maxValue = {'date': { 
				year: nullDate.getFullYear(), 
				month: nullDate.getMonth() + 1, 
				day: nullDate.getDate() } 
			};
		}
	}

	registerOnChange(fn) {
		this.onChange = fn;
	}

	writeValue(value) {
		if (value) {
			this.value = value;
		}
	}

	registerOnTouched(fn) { 
		this.onTouched = fn;
	}
	onInputFocusBlur(event): void {
		if(!event || !event.reason){
			return
		}
      	if(event.reason == 1){
      		this.focusIn = true;
			this.cdRef.detectChanges();
      	}else{
      		this.focusIn = false;
      		if (!event.value || event.value == ""){
      			return
      		}
 				/*
 				8- MMDDYYYY 06082017
				7- MDDYYYY 6082017
				6- MMDDYY 060817
				5- MDDYY 60817
				4- MDYY 6817
				MM/DD/YYYY 06/08/2017
				M/DD/YYYY 6/08/2017
				MM/DD/YY 06/08/17
				M/DD/YY 6/08/17
				M/D/YY 6/8/17
 				*/
 			const value = event.value.split(this.dateSeperator);
 			if(value.length > 3){
 				//too many speperators
 				return;
 			}
 			if(value.length == 2){
 				//not enuf speperators
 				return;
 			}
 			if(value.length == 3){
 				if(value[2].length ==4 || value[2].length ==2){

 				}else{
	 				//correct seperators, but the year is not the right length
	 				return; 					
 				}
 			}
 			if(value.length == 3  && value[0].length == 2 && value[1].length ==2 && value[2].length == 4){
 				//correct seperators, the year month and day are in the expected format, so ignore
 				return;
 			}
			this.mydp.clearDate();
 			//join the fields
 			const dateStr = value.join('');
 				/*
 				8- MMDDYYYY 06082017
				7- MDDYYYY 6082017
				6- MMDDYY 060817
				5- MDDYY 60817
				4- MDYY 6817
 				*/
 			let yy;
 			let mm;
 			let dd;

			switch(dateStr.length) {
			    case 8:
			    	mm = dateStr.substring(0, 2);
			    	dd = dateStr.substring(2, 4);
			    	yy = dateStr.substring(4);
			        break;
			    case 7:
			    	mm = '0'+dateStr.substring(0, 1);
			    	dd = dateStr.substring(1, 3);
			    	yy = dateStr.substring(3);
			        break;
			    case 6:
			    	mm = dateStr.substring(0, 2);
			    	dd = dateStr.substring(2, 4);
			    	yy = '20'+ dateStr.substring(4);
			        break;
			    case 5:
			    	mm = '0'+dateStr.substring(0, 1);
			    	dd = dateStr.substring(1, 3);
			    	yy = '20'+ dateStr.substring(3);
			        break;
			    case 4:
			    	mm = '0'+dateStr.substring(0, 1);
			    	dd = '0'+dateStr.substring(1, 2);
			    	yy = '20'+dateStr.substring(2);
			        break;
			}
 			this.value = `${mm}${this.dateSeperator}${dd}${this.dateSeperator}${yy}`;
			this.mydp.onUserDateInput(this.value);
			this.cdRef.detectChanges();

      	}
  	}
	saveValue(e) {
 		this.value = e.value;
		if(!e.value){
			this.isValidDate.emit(false);
		}
		if(e.valid){
			this.isValidDate.emit(true);
			this.form.patchValue({ [this.question.key]: this.value });
		}else{
			this.isValidDate.emit(false);
			this.form.patchValue({ [this.question.key]: null });
		}
	}	
}