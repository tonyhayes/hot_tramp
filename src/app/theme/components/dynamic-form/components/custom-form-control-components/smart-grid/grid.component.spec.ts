import { GridSmartComponent } from './grid.component';
import { GridSmartQuestion } from '../../question-grid-smart';
import { ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

describe('GridSmartComponent', () => {
	const propagateChange:any = () => {
		return 'value'
	};
	const form = {
		patchValue: () => {
			return 'value'
		}
	};
	const grid = new GridSmartQuestion({
			options: {
				key: 'relatedDocuments',
				order: 27,
				label: 'Related Documents'
			},
			columns: [
				{ key: 'date',  label: 'Date' },
				{ key: 'logEntry',  label: 'Log Entry' },
				{ key: 'topic',   label: 'Topic' },
				{ key: 'direction', label: 'Direction' },
				{ key: 'status', label: 'Status' },
			],
			data: [
				{ 
					'date': '10/11/2016',
					'logEntry': 'This is a Log Entry',
					'topic': 'A Really Long Topic',
					'direction': 'Some Sort of Direction',
					'status': 'Need another meeting' 
				},
				{ 
					'date': '10/17/2016',
					'logEntry': 'This is another Log Entry',
					'topic': 'A Topic',
					'direction': 'Pleave evaluate',
					'status': 'still considering' 
				},
			]
		})
  
	//specs
	it('should be a gridValue of Select', () => {
		const component = new GridSmartComponent(Overlay, ViewContainerRef, Modal);
		component.question = grid;
		component.form = form;
		expect(component.gridValue).toEqual('Select');
	});
	it('should return Select for writeValue()', () => {
		const component = new GridSmartComponent(Overlay, ViewContainerRef, Modal);
		component.question = grid;
		component.form = form;
		component.writeValue(null)
		expect(component.gridValue).toEqual('Select');
	});
	it('should return 10 for writeValue(10)', () => {
		const component = new GridSmartComponent(Overlay, ViewContainerRef, Modal);
		component.question = grid;
		component.form = form;
		component.writeValue('10')
		expect(component.gridValue).toEqual('10');
	});
	it('should return 0 for _disabledV', () => {
		const component = new GridSmartComponent(Overlay, ViewContainerRef, Modal);
		component.question = grid;
		component.form = form;
		expect(component._disabledV).toEqual('0');
	});
	it('should get disabledV', () => {
		const component = new GridSmartComponent(Overlay, ViewContainerRef, Modal);
		component.question = grid;
		component.form = form;
		component._disabledV = '1',
		expect(component.disabledV).toEqual('1');
	});
	it('should set disabledV', () => {
		const component = new GridSmartComponent(Overlay, ViewContainerRef, Modal);
		component.question = grid;
		component.form = form;
		component.disabledV = '1',
		expect(component._disabledV).toEqual('1');
		expect(component.disabled).toEqual(true);
	});
	it('should set disabledV but not disabled', () => {
		const component = new GridSmartComponent(Overlay, ViewContainerRef, Modal);
		component.question = grid;
		component.form = form;
		component.disabledV = '5',
		expect(component._disabledV).toEqual('5');
		expect(component.disabled).toEqual(false);
	});
	it('should return false for disabled', () => {
		const component = new GridSmartComponent(Overlay, ViewContainerRef, Modal);
		component.form = form;
		component.question = grid;
		expect(component.disabled).toEqual(false);
	});
	it('should return null for query', () => {
		const component = new GridSmartComponent(Overlay, ViewContainerRef, Modal);
		component.form = form;
		component.question = grid;
		expect(component.query).toEqual('');
	});
	it('should return string for settings', () => {
		const component = new GridSmartComponent(Overlay, ViewContainerRef, Modal);
		component.form = form;
		component.question = grid;
		expect(component.settings.add.addButtonContent).toEqual('<i class="ion-ios-plus-outline"></i>');
	});
	it('should return columns for ngOnInit', () => {
		const component = new GridSmartComponent(Overlay, ViewContainerRef, Modal);
		component.form = form;
		component.question = grid;
		component.ngOnInit();
		expect(component.settings.columns.date.title).toEqual("Date");
	});
	it('should propagateChange for registerOnChange', () => {
		const component = new GridSmartComponent(Overlay, ViewContainerRef, Modal);
		component.form = form;
		component.question = grid;
		component.registerOnChange(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
	});
	it('should propagateChange for registerOnTouched', () => {
		const component = new GridSmartComponent(Overlay, ViewContainerRef, Modal);
		component.form = form;
		component.question = grid;
		component.registerOnTouched(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
	});
	it('should run  selected', () => {
		const component = new GridSmartComponent(Overlay, ViewContainerRef, Modal);
		component.question = grid;
		component.form = form;
		component.registerOnTouched(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
		component.selected(component.propagateChange());
	});
	it('should run  removed', () => {
		const component = new GridSmartComponent(Overlay, ViewContainerRef, Modal);
		component.form = form;
		component.question = grid;
		component.registerOnTouched(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
		component.removed(component.propagateChange());
	});
	it('should run  refreshValue', () => {
		const component = new GridSmartComponent(Overlay, ViewContainerRef, Modal);
		component.form = form;
		component.question = grid;
		component.registerOnTouched(propagateChange);
		expect(component.propagateChange).toBeDefined();
		expect(component.propagateChange()).toEqual('value');
		component.refreshValue([component.propagateChange()]);
	});

}) 

