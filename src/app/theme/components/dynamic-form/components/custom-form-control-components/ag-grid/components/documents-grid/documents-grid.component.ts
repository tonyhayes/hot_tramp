import { Component, OnInit, forwardRef, Input, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import * as toastr from 'toastr';

import { GridOptions } from 'ag-grid/main';
import '../../ag-grid.component.loader';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


// only import this if you are using the ag-Grid-Enterprise
//import 'ag-grid-enterprise/main';

@Component({
	moduleId: module.id,
	selector: 'documents-grid',
	templateUrl: 'documents-grid.component.html',
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DocumentsGridComponent), multi: true },
	]

})
export class DocumentsGridComponent  implements ControlValueAccessor, OnInit{

	propagateChange:any = () => {};
	@Input('gridValue') _gridValue = 'Select';
	@Input() question;
	@Input() form: FormGroup;
	private gridOptions:GridOptions;
	private gridModalOptions:GridOptions;
	private showGrid:boolean;
	private rowData:any[];
	private columnDefs:any[];
  	private _disabledV:string = '0';
  	private disabled:boolean = false;
  	private showSelect:boolean = false;
  	private category:{id:number, name:string}  = {
  		id: 1,
  		name: 'aaa'
  	};
  	private selectedCategory:any = {
  		id: 1
  	};
  	private selectedDocument:{} = {
  		id: 0
  	};
	private categories:any[];
	private documents:any[];
	private columnDocDefs:any[];
	private docRows:any[];
	private categoryDocuments:any[];
  	private status = {isopen: false};
  	closeResult: string;
	constructor(overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal, private modalService: NgbModal) {
		// we pass an empty gridOptions in, so we can grab the api out
		this.gridOptions = <GridOptions>{};
		this.gridModalOptions = <GridOptions>{};
		this.showGrid = true;
		overlay.defaultViewContainer = vcRef; 
		this.categories =  [
			{id:1, name: 'Correspondence'},
			{id:2, name: 'Daily Log'},
			{id:3, name: 'Drawing'},
			{id:4, name: 'Gaylort'},
			{id:5, name: 'Issue'},
			{id:6, name: 'Jaspersoft'},
			{id:7, name: 'Meeting'},
		];
		this.documents =  [
			{id:1, category: 1, topic: 'Topic 30', number: 1, date: '12/12/2016', },
			{id:2, category: 1, topic: 'Job 200 - rfi 2', number: 2, date: '12/12/2016'},
			{id:3, category: 1, topic: 'RE: 11/20/16 3:59pm', number: 3, date: '12/12/2016'},
			{id:4, category: 1, topic: 'Industry Report', number: 4, date: '12/12/2016'},
			{id:5, category: 1, topic: 'Issue', number: 5, date: '12/12/2016'},
			{id:6, category: 1, topic: 'Help!', number: 6, date: '12/12/2016'},
			{id:7, category: 1, topic: 'Meeting', number: 7, date: '12/12/2016'},
		];
		this.columnDocDefs = [
			{'headerName': 'Date', 'field': 'date' },
			{'headerName': 'Number', 'field': 'number' },
			{'headerName': 'Topic', 'field': 'topic' },
			{'headerName': 'Answered Date', 'field': 'ansDate' },
			{'headerName': 'Log Classification', 'field': 'log' },
			{'headerName': 'Closed', 'field': 'closed' },
			{'headerName': 'Status', 'field': 'status' },
		];
		this.docRows = [
			{ 'date':'10/10/2016', 'number': 1, 'topic': 'regarding our meeting today', 'ansDate': '12/12/2016', 'log': 'email', 'closed': 'yes', 'status': 'open'},
			{ 'date':'10/12/2016', 'number': 2, 'topic': 'lost contract', 'ansDate': '12/12/2016', 'log': 'email', 'closed': 'yes', 'status': 'open'},
			{ 'date':'10/19/2016', 'number': 3, 'topic': 'found contract', 'ansDate': '12/12/2016', 'log': 'email', 'closed': 'yes', 'status': 'open'},
			{ 'date':'11/12/2016', 'number': 4, 'topic': 'regarding our last meeting', 'ansDate': '12/12/2016', 'log': 'email', 'closed': 'yes', 'status': 'open'},
			{ 'date':'11/17/2016', 'number': 5, 'topic': 'require a new meeting', 'ansDate': '12/12/2016', 'log': 'email', 'closed': 'yes', 'status': 'open'},
			{ 'date':'12/22/2016', 'number': 6, 'topic': 'project in chaos', 'ansDate': '12/12/2016', 'log': 'email', 'closed': 'yes', 'status': 'open'},
			{ 'date':'12/24/2016', 'number': 7, 'topic': 'lost keys', 'ansDate': '12/12/2016', 'log': 'email', 'closed': 'yes', 'status': 'open'},
			{ 'date':'12/28/2016', 'number': 8, 'topic': 'cancel next meeting', 'ansDate': '12/12/2016', 'log': 'email', 'closed': 'yes', 'status': 'open'}
		]
	}
	get gridValue() {
		return this._gridValue;
	}
  
	set gridValue(val) {
		this._gridValue = val;
		this.propagateChange(val);
	}
	public ngOnInit():void {
		this.columnDefs = [];
		this.rowData = [];
		this.question.columns.forEach( column => {
			this.columnDefs.push({ 'headerName': column.label, 'field': column.key });
		});
		this.rowData = this.question.data;
	}
	private addItem() {
    	var newItems = [];
    	this.gridOptions.api.addItems(newItems);
	}
	writeValue(value) {
		if (value) {
			this.gridValue = value;
		}
	}

	registerOnChange(fn) {
		this.propagateChange = fn;
	}

	registerOnTouched(fn) {
		this.propagateChange = fn;  		
	}
  	private get disabledV():string {
    	return this._disabledV;
  	}

  	private set disabledV(value:string) {
    	this._disabledV = value;
    	this.disabled = this._disabledV === '1';
  	}
 	private selectCategory(category:any, content:any):void {
    	console.log('Selected categoryId is: ', category.id);
    	this.categoryDocuments = this.documents.filter((item)=> this.documents[0].id == category.id);
    	if(!this.categoryDocuments.length){
    		this.selectedCategory.id = 0;
			toastr.info('No documents found for this category');
    		return
    	}
		this.open(content)
    	this.selectedCategory = Object.assign({}, category);
  	}
 	private selectDocument(documentId:number):void {
    	console.log('Selected documentId is: ', documentId);
    	if(documentId){
    		this.categoryDocuments.forEach( document =>{
    			if(document.id == documentId){
		    		this.gridOptions.api.addItems([{
		    			'date':document.date, 
		    			'logEntry':this.selectedCategory.name +' '+document.number, 
		    			'topic': document.topic,
		    			'direction': 'inbound', 
						'status': ''  
		    		}]);
					toastr.info('documents added');    				
    			}
    		})
    	}
		this.selectedCategory.id = 0;
		this.showSelect = false;
    	return;
  	}

  	private removed(value:any):void {
    	console.log('Removed value is: ', value);
  	}

  	private refreshValue(value:any):void {
		this.form.patchValue({ [this.question.key]: value.map(val=> val.id) });
		this.propagateChange(value);
  	}
	onDeleteConfirm(event): void {
		this.modal.confirm()
							.size('sm')
							.isBlocking(true)
							.showClose(true)
							.keyboard(27)
							.title('Delete Record')
							.body('Pressing OK will delete this record')
							.open()
							.then((resultPromise) => {
									resultPromise.result.then((result) => {
    								this.gridOptions.api.removeItems(event.node);
									toastr.info('record deleted');
								}, () => {
							});
		});
	}
  	open(content) {
    	this.modalService.open(content).result.then((result) => {
      		this.closeResult = `Closed with: ${result}`;
    	}, (reason) => {
      		this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    	});
  	}

  	private getDismissReason(reason: any): string {
    	if (reason === ModalDismissReasons.ESC) {
      		return 'by pressing ESC';
    	} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      		return 'by clicking on a backdrop';
    	} else {
      		return  `with: ${reason}`;
    	}
  	}


	private onRowClicked($event) {
		console.log('onRowClicked: ' + $event.node.data);
		const document = $event.node.data;
		if(document){
    		this.gridOptions.api.addItems([{
    			'date':document.date, 
    			'logEntry':this.selectedCategory.name +' '+document.number, 
    			'topic': document.topic,
    			'direction': 'inbound', 
				'status': document.status  
    		}]);
			toastr.info('document added');    				
		}
	}
	removeSelected() {
    	const selectedNodes = this.gridOptions.api.getSelectedNodes();
    	if(selectedNodes){
	    	this.gridOptions.api.removeItems(selectedNodes);
			toastr.info('document deleted');    				    		
    	}
	}


}

