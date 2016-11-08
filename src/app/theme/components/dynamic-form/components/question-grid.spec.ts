import { GridQuestion } from './question-grid';

describe('GridQuestion', () => {
  
  //specs
  	it('should be a controlType of grid', () => {
  		const grid = new GridQuestion();
    	expect(grid.controlType).toEqual('grid');
  	});
  	it('should return empty columns array', () => {
  		const grid = new GridQuestion();
    	expect(grid.columns.length).toEqual(0);
  	});
  	it('should be a formatted grid', () => {
		const grid =	new GridQuestion({
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
					{ 'date': '10/11/2016',
					'logEntry': 'This is a Log Entry',
					'topic': 'A Really Long Topic',
					'direction': 'Sone Sort of Direction',
					'status': 'Need another meeting' },
				]
			});
		console.log(grid)
    	expect(grid.key).toEqual('relatedDocuments');
    	expect(grid.label).toEqual('Related Documents');
  	});
  	it('should be a formatted grid, with options', () => {
		const grid =	new GridQuestion({
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
					{ 'date': '10/11/2016',
					'logEntry': 'This is a Log Entry',
					'topic': 'A Really Long Topic',
					'direction': 'Sone Sort of Direction',
					'status': 'Need another meeting' },
				]
			});
    	expect(grid.columns.length).toEqual(5);
    	expect(grid.options.key).toEqual('relatedDocuments');
    	expect(grid.options.order).toEqual(27);
  	});
}) 

