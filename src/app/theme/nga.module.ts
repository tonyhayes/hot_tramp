import { NgModule, ModuleWithProviders  }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { HttpModule }  from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectModule } from 'ng2-select/ng2-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AgGridModule } from 'ag-grid-ng2/main';
import { DragulaModule } from 'ng2-dragula';

import {
	ThemeConfig
} from './theme.config';

import {
	ThemeConfigService
} from './theme.config.service';

import {
	AppsDropdown,
	AmChart,
	BackTop,
	Card,
	ChartistChart,
	Checkbox,
	ContentTop,
	DynamicFormComponent,
	DynamicFormQuestionComponent,
	CounterInputComponent,
	DropdownSelectComponent,
	DatalistSelectComponent,
	GridSmartComponent,
	TagSelectComponent,
	DocumentsGridComponent,
	FormDesignerComponent,
	FullCalendar,
	MenuItem,
	Menu,
	MsgCenter,
	MultiCheckbox,
	Navbar,
	NavbarItem,
	NavbarTop,
	PageTop,
	PictureUploader,
	Sidebar
} from './components';

import { CardBlur } from './components/card/card-blur.directive';

import {
	ScrollPosition,
	SlimScroll,
	ThemeRun,
} from './directives';

import {
	AppLogoPipe,
	AppPicturePipe,
	KameleonPicturePipe,
	ProfilePicturePipe
} from './pipes';

import {
	ImageLoaderService,
	ThemePreloader,
	ThemeSpinner,
	HeartbeatService,
	SpeechRecognitionService

} from './services';

import {
	EmailValidator,
	EqualPasswordsValidator
} from './validators';

const NGA_COMPONENTS = [
	AppsDropdown,
	AmChart,
	BackTop,
	Card,
	ChartistChart,
	Checkbox,
	ContentTop,
	DynamicFormComponent,
	DynamicFormQuestionComponent,
	CounterInputComponent,
	DropdownSelectComponent,
	GridSmartComponent,
	DocumentsGridComponent,
	DatalistSelectComponent,
	TagSelectComponent,
	FormDesignerComponent,
	FullCalendar,
	MenuItem,
	Menu,
	MsgCenter,
	MultiCheckbox,
	Navbar,
	NavbarItem,
	NavbarTop,
	PageTop,
	PictureUploader,
	Sidebar,
];

const NGA_DIRECTIVES = [
	ScrollPosition,
	SlimScroll,
	ThemeRun,
	CardBlur,
];

const NGA_PIPES = [
	AppLogoPipe,
	AppPicturePipe,
	KameleonPicturePipe,
	ProfilePicturePipe
];

const NGA_SERVICES = [
	ImageLoaderService,
	ThemePreloader,
	ThemeSpinner,
	HeartbeatService,
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
		ModalModule.forRoot(),
		BootstrapModalModule,
		HttpModule,
		NgbModule,
		SelectModule,
		Ng2SmartTableModule,
		AgGridModule.withComponents(),
		DragulaModule

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
