import { Util } from '../../../framework/helpers/util';
export interface Category {
    "id": string,/*unique id for category*/
    "title": string,/*Category Title - displayed in sidebar*/
    "icon": string,/*icon displayed in sidebar*/
    "componentType": string,/* hard coded to 'notes' - only 1 component type at the moment*/
    "order": number/* order of category in the sidebar*/
    "listStyle": boolean/* multiple form entries*/
}
export class CategoryManager {

	id;
	title;
	icon;
	componentType;
	order;
	listStyle
	categories:Category[];
	categoryMap = new Map();

	constructor() {}

	addCategories(categories){
		if(!categories || !categories.length){
			return
		}
		this.categories = categories.map(category =>{
			const cat = { id: category.categoryId,  
				title: category.categoryTitle, 
				icon: category.icon, 
				componentType: category.componentType, 
				order: category.displayOrder, 
				listStyle: category.listStyle || false 
			};
			this.categoryMap.set(cat.id, cat);
			return cat;

		})
	}
	getCategories():Category[] {
		return this.sortCategories();
	}
	getCategory(id):Category {
		return this.categoryMap.get(id);
	}
	getCategoryTitle(id) {
		return this.categoryMap.get(id).title;
	}
	getCategoryIcon(id) {
		return this.categoryMap.get(id).icon;
	}
	getCategoryComponentType(id) {
		return this.categoryMap.get(id).componentType;
	}
	getCategoryListStyle(id) {
		return this.categoryMap.get(id).listStyle;
	}
	sortCategories() {
		return this.categories.sort(Util.dynamicSort('order'));
	}
}