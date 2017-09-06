// Load the implementations that should be tested
import { CategoryManager } from './category';
import {} from 'jasmine'

describe('CategoryManager', () => {
	const categoryManager = new CategoryManager();
	const categories = [
	    {
	        "categoryId": "1",
	        "categoryTitle": "Weather",
	        "icon": "ion-umbrella",
	        "componentType": "notes",
	        "displayOrder": 1,
	        "listStyle": false
	    },
	    {
	        "categoryId": "2",
	        "categoryTitle": "Crew",
	        "icon": "ion-android-contacts",
	        "componentType": "notes",
	        "displayOrder": 2,
	        "listStyle": true
	    },
	    {
	        "categoryId": "3",
	        "categoryTitle": "Visitor",
	        "icon": "ion-clipboard",
	        "componentType": "notes",
	        "displayOrder": 3,
	        "listStyle": true
	    },
	    {
	        "categoryId": "4",
	        "categoryTitle": "Work Completed",
	        "icon": "ion-hammer",
	        "componentType": "notes",
	        "displayOrder": 4,
	        "listStyle": true
	    },
	    {
	        "categoryId": "5",
	        "categoryTitle": "Photo",
	        "icon": "ion-android-image",
	        "componentType": "notes",
	        "displayOrder": 5,
	        "listStyle": true
	    },
	    {
	        "categoryId": "6",
	        "categoryTitle": "Signature",
	        "icon": "ion-paintbrush",
	        "componentType": "notes",
	        "displayOrder": 6,
	        "listStyle": true
	    }
	]
	it('should have a CategoryManager object',() => {
		expect(categoryManager).toBeDefined();
	});
	it('should addCategories',() => {
		categoryManager.addCategories(categories);
		expect(categoryManager.categories.length).toEqual(6);
	});
	it('should getCategories',() => {
		expect(categoryManager.getCategories().length).toEqual(6);
	});
	it('should getCategory',() => {
		expect(categoryManager.getCategory('1')).toEqual({id: '1',title: 'Weather', icon: 'ion-umbrella', componentType: 'notes', order: 1, listStyle: false});
	});
	it('should getCategoryTitle',() => {
		expect(categoryManager.getCategoryTitle('6')).toEqual('Signature');
	});
	it('should getCategoryIcon',() => {
		expect(categoryManager.getCategoryIcon('6')).toEqual('ion-paintbrush');
	});
	it('should getCategoryComponentType',() => {
		expect(categoryManager.getCategoryComponentType('6')).toEqual('notes');
	});
	it('should getCategoryListStyle',() => {
		expect(categoryManager.getCategoryListStyle('6')).toEqual(true);
	});
	it('should sortCategories',() => {
		expect(categoryManager.sortCategories()[0]).toEqual({id: '1',title: 'Weather', icon: 'ion-umbrella', componentType: 'notes', order: 1, listStyle: false});
	});

});