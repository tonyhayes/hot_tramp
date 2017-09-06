import { GridSmartQuestion } from './question-grid-smart';
import {} from 'jasmine'

describe('GridSmartQuestion', () => {
  
  //specs
  	it('should be a controlType of smart-grid', () => {
  		const grid = new GridSmartQuestion();
    	expect(grid.controlType).toEqual('smart-grid');
  	});
  	it('should be a formatted grid', () => {
		const grid =	new GridSmartQuestion({
				key: 'relatedDocuments',
				order: 27,
				label: 'Related Documents',
				columns: [
					{ key: 'date',  label: 'Date' },
					{ key: 'logEntry',  label: 'Log Entry' },
					{ key: 'topic',   label: 'Topic' },
					{ key: 'direction', label: 'Direction' },
					{ key: 'status', label: 'Status' },
				],
				data: [
					{ 'date': '10/11/2016',
					'logEntry': 'This is a Log Entry',
					'topic': 'A Really Long Topic',
					'direction': 'Sone Sort of Direction',
					'status': 'Need another meeting' },
				]
			});
    	expect(grid.key).toEqual('relatedDocuments');
    	expect(grid.label).toEqual('Related Documents');
  	});
  	it('should be a formatted grid, with options', () => {
		const grid =	new GridSmartQuestion({
				key: 'relatedDocuments',
				order: 27,
				label: 'Related Documents',
				columns: [
					{ key: 'date',  label: 'Date' },
					{ key: 'logEntry',  label: 'Log Entry' },
					{ key: 'topic',   label: 'Topic' },
					{ key: 'direction', label: 'Direction' },
					{ key: 'status', label: 'Status' },
				],
				data: [
					{ 'date': '10/11/2016',
					'logEntry': 'This is a Log Entry',
					'topic': 'A Really Long Topic',
					'direction': 'Sone Sort of Direction',
					'status': 'Need another meeting' },
				]
			});
    	expect(grid.columns.length).toEqual(5);
    	expect(grid.key).toEqual('relatedDocuments');
    	expect(grid.order).toEqual(27);
  	});
}) 

