import { NgModule, ModuleWithProviders  }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule }  from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectModule } from 'ng2-select/ng2-select';
import { QuillModule } from 'ngx-quill';
import { SignaturePadModule } from 'angular2-signaturepad';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { MyDatePickerModule } from 'mydatepicker';
import { DndModule } from 'ng2-dnd';
import { ImageCropperComponent } from 'ng2-img-cropper';

import {
	ThemeConfig
} from './theme.config';

import {
	ThemeConfigService
} from './theme.config.service';

import {
	AppsDropdown,
	BackTop,
	Card,
	ContentTop,
	DynamicFormComponent,
	DynamicFormQuestionComponent,
	CounterInputComponent,
	DropdownSelectComponent,
	DropdownSelectKeyboardComponent,
	DatalistSelectComponent,
	TagSelectComponent,
	SignatureComponent,
	SignatureFieldComponent,
	VideoComponent,
	PhotoComponent,
	PhotoMultiComponent,
	PhotoFieldComponent,
	NotesComponent,
	TimepickerComponent,
	DatepickerComponent,
	WeatherUndergroundComponent,
	Footer,
	FormDesignerComponent,
	MenuItem,
	Menu,
	Navbar,
	NavbarItem,
	NavbarTop,
	PageTop,
	Sidebar,
	UserProfileDropdown,
	Accordion, AccordionItem, AccordionItemHead, AccordionItemBody
} from './components';


import {
	ScrollPosition,
	SlimScroll,
	ThemeRun,
	FocusInput,
	DcDropdown, DcDropdownToggle
} from './directives';

import {
	AppLogoPipe,
	AppPicturePipe,
	KameleonPicturePipe,
	ProfilePicturePipe,
	NameSearchFilterPipe,
	TranslatePipe,
	OrderByPipe
} from './pipes';

import {
	ImageLoaderService,
	ThemePreloader,
	ThemeSpinner,
	SpeechRecognitionService

} from './services';

import {
	EmailValidator,
	EqualPasswordsValidator
} from './validators';

const NGA_COMPONENTS = [
	AppsDropdown,
	BackTop,
	Card,
	ContentTop,
	DynamicFormComponent,
	DynamicFormQuestionComponent,
	CounterInputComponent,
	DropdownSelectComponent,
	DropdownSelectKeyboardComponent,
	DatalistSelectComponent,
	TagSelectComponent,
	SignatureComponent,
	SignatureFieldComponent,
	VideoComponent,
	PhotoComponent,
	PhotoMultiComponent,
	PhotoFieldComponent,
	NotesComponent,
	TimepickerComponent,
	DatepickerComponent,
	WeatherUndergroundComponent,
	Footer,
	FormDesignerComponent,
	MenuItem,
	Menu,
	Navbar,
	NavbarItem,
	NavbarTop,
	PageTop,
	Sidebar,
	UserProfileDropdown,
	Accordion, AccordionItem, AccordionItemHead, AccordionItemBody,
	ImageCropperComponent

];

const NGA_DIRECTIVES = [
	ScrollPosition,
	SlimScroll,
	ThemeRun,
	FocusInput,
	DcDropdown, DcDropdownToggle
];

const NGA_PIPES = [
	AppLogoPipe,
	AppPicturePipe,
	KameleonPicturePipe,
	ProfilePicturePipe,
	NameSearchFilterPipe,
	TranslatePipe,
	OrderByPipe
];

const NGA_SERVICES = [
	ImageLoaderService,
	ThemePreloader,
	ThemeSpinner,
	SpeechRecognitionService
];

const NGA_VALIDATORS = [
	EmailValidator,
	EqualPasswordsValidator
];

@NgModule({
	declarations: [
		...NGA_PIPES,
		...NGA_DIRECTIVES,
		...NGA_COMPONENTS
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		NgbModule.forRoot(),
		SelectModule,
		QuillModule,
		SignaturePadModule,
		DateTimePickerModule,
		MyDatePickerModule,
		DndModule.forRoot(),
	],
	exports: [
		...NGA_PIPES,
		...NGA_DIRECTIVES,
		...NGA_COMPONENTS
	]
})
export class NgaModule {
  	static forRoot(): ModuleWithProviders {
     	return <ModuleWithProviders> {
      		ngModule: NgaModule,
       		providers: [
         		ThemeConfigService,
         		ThemeConfig,
         		...NGA_VALIDATORS,
         		...NGA_SERVICES
       		],
     	};
   	}
}		
