import { Router, Routes } from '@angular/router';

//import { PAGES_MENU } from '../pages/pages.menu';
import { MenuService } from './menu.service';
import { TRANSLATIONS, TranslateService } from '../translate';
import {} from 'jasmine'

describe('MenuService', () => {
	// provide our implementations or mocks to the dependency injector
	const translate = new TranslateService(TRANSLATIONS);
	const ms = new MenuService(null, translate);
	const testObj = {
		selected: null,
		url: '#tony',		
		route: {
			paths:[ 'tony']
		}		
	}
	const menuItems = [
	{
		"title": "Dashboard",
		"icon": "ion-android-home",
		"selected": true,
		"order": 0,
		"route": {
			"path": "dashboard",
			"data": {},
			"paths": [
				"pages",
				"dashboard"
			]
		},
		"url": "#/pages/dashboard",
		"target": ""
	},
	{
		"title": "External Link",
		"url": "http://www.dexterchaney.com/",
		"icon": "ion-android-exit",
		"order": 100,
		"target": "_blank",
		"route": {
			"path": "",
			"data": {},
			"paths": [
				"pages",
				""
			]
		},
		"selected": false
	}
]
 	const PAGES_MENU = [
		{
			path: 'pages',
			children: [
				{
					path: 'user-administration',
					data: {
						menu: {
							title: 'User Administration',
							icon: 'ion-person-stalker',
							selected: true,
							order: 10
						}
					}
				},
			]
		}
	];
 	const PAGES_MENU_SKIP = [
		{
			path: 'pages',
			children: [
				{
					path: 'user-administration',
					skip: true,
					data: {
						menu: {
							title: 'User Administration',
							icon: 'ion-person-stalker',
							selected: true,
							order: 10
						}
					}
				},
			]
		}
	];
 	const PAGES_MENU_SKIP_NO_DATA = [
		{
			path: 'pages',
			children: [
				{
					path: 'user-administration',
				},
			]
		}
	];

const FIELD_MENU = [
	{
		path: 'project-management',
		children: [
			{
				path: ['/project-management/field-report-detail/weather'],
				data: {
					menu: {
						id: '1',
						title: 'Weather',
						icon: 'ion-umbrella',
						selected: false,
       					componentType: 'weather',
						header: true,
						expanded: false,
						order: 0
					}
				}
			},
			{
				path: ['/project-management/field-report-detail/crew'],
				data: {
					menu: {
						id: '2',
						title: 'Crew',
						icon: 'ion-android-contacts',
        				componentType: 'crew',
						selected: false,
						header: true,
						expanded: false,
						order: 0
					}
				}
			},
			{
				path: ['/project-management/field-report-detail/notes'],
    			data: {
      				menu: {
      					id:'3',
        				title: 'Work Completed',
        				icon: 'ion-android-document',
 						header: true,
        				expanded: false,
        				componentType: 'notes',
        				order: 0,
      				}
    			},
    			children: [
      						{
        						path: ['/project-management/field-report-detail/notes/14374/Work Completed/1491848796452'],
    							data: {
      								menu: {
        								title: 'First Report',
      								}
    							}
  							},
      						{
        						path: ['/project-management/field-report-detail/notes/14374/Work Completed/1491848796452'],
    							data: {
      								menu: {
        								title: 'Second Report',
      								}
    							}
  							}
					]
				},
			{
				path: ['/project-management/field-report-detail/photo'],
				data: {
					menu: {
						id:'4',
						title: 'Photo',
						icon: 'ion-android-image',
						selected: false,
       					componentType: 'photo',
						header: true,
						expanded: false,
						order: 0
					}
				}
			},
			{
				path: ['/project-management/field-report-detail/signature'],
				data: {
					menu: {
						id:'5',
						title: 'Signature',
						icon: 'ion-android-create',
						header: true,
						selected: false,
       					componentType: 'signature',
						expanded: false,
						order: 0
					}
				}
			},
		]
	}
];

const FIELD_MENU_NO_ARRAY = [
	{
		path: 'project-management',
		children: [
			{
				path: '/project-management/field-report-detail/weather',
				data: {
					menu: {
						id:'1',
						title: 'Weather',
						icon: 'ion-umbrella',
						selected: false,
       					componentType: 'weather',
						header: true,
						expanded: false,
						order: 0
					}
				}
			},
			{
				path: '/project-management/field-report-detail/crew',
				data: {
					menu: {
						id:'2',
						title: 'Crew',
						icon: 'ion-android-contacts',
        				componentType: 'crew',
						selected: false,
						header: true,
						expanded: false,
						order: 0
					}
				}
			},
			{
				path: '/project-management/field-report-detail/notes',
    			data: {
      				menu: {
      					id:'3',
        				title: 'Work Completed',
        				icon: 'ion-android-document',
 						header: true,
        				expanded: false,
        				componentType: 'notes',
        				order: 0,
      				}
    			},
    			children: [
      						{
        						path: '/project-management/field-report-detail/notes/14374/Work Completed/1491848796452',
    							data: {
      								menu: {
        								title: 'First Report',
      								}
    							}
  							},
      						{
        						path: '/project-management/field-report-detail/notes/14374/Work Completed/1491848796452',
    							data: {
      								menu: {
        								title: 'Second Report',
      								}
    							}
  							}
					]
				},
			{
				path: '/project-management/field-report-detail/photo',
				data: {
					menu: {
						id:'4',
						title: 'Photo',
						icon: 'ion-android-image',
						selected: false,
       					componentType: 'photo',
						header: true,
						expanded: false,
						order: 0
					}
				}
			},
			{
				path: '/project-management/field-report-detail/signature',
				data: {
					menu: {
						id:'5',
						title: 'Signature',
						icon: 'ion-android-create',
						header: true,
						selected: false,
       					componentType: 'signature',
						expanded: false,
						order: 0
					}
				}
			},
		]
	}
];



	it('should define MenuService', () => {
	  	expect(MenuService).toBeDefined();
	});
	it('should construct MenuService', () => {
	  	expect(ms).toBeDefined();
	});
	// it('should get true from selected', () => {
	// 	ms.router = {
	// 			url:'tony',
	// 			createUrlTree:  ()=>{},
	// 			isActive:  ()=>{ return true },

	// 		};
	// 	const testObjReturn = ms.selectItem(testObj);		
	//   	expect(testObjReturn.selected).toEqual(true);

	// });
	it('should get items from convertRoutesToMenus', () => {
		const testObjReturn = ms.convertRoutesToMenus(menuItems);
	  	expect(testObjReturn.length).toEqual(0);

	});
	// it('should get from getCurrentItem', () => {
	// 	ms.currentMenuItem = {item:'tones'};
	// 	const testObjReturn = ms.getCurrentItem();		
	//   	expect(testObjReturn.item).toEqual('tones');

	// });
	// it('should get currentMenuItem from selectMenuItem', () => {
	// 	ms.router = {
	// 			url:'dashboard',
	// 			createUrlTree:  ()=>{},
	// 			isActive:  ()=>{ return true },

	// 		};
	// 	const testObjReturn = ms.selectMenuItem(menuItems);
	//   	expect(ms.currentMenuItem.title).toEqual('External Link');
	//   	expect(testObjReturn.length).toEqual(2);

	// });
	it('should get items from skipEmpty PAGES_MENU', () => {
		const testObjReturn = ms.skipEmpty(PAGES_MENU[0].children);
	  	expect(testObjReturn.length).toEqual(1);

	});
	it('should get items from skipEmpty PAGES_MENU_SKIP', () => {
		const testObjReturn = ms.skipEmpty(PAGES_MENU_SKIP[0].children);
	  	expect(testObjReturn.length).toEqual(0);

	});
	it('should get items from skipEmpty FIELD_MENU', () => {
		const testObjReturn = ms.skipEmpty(FIELD_MENU[0].children);
	  	expect(testObjReturn.length).toEqual(5);

	});
	it('should get items from convertArrayToItems', () => {
		const testObjReturn = ms.convertArrayToItems(menuItems);
	  	expect(testObjReturn.length).toEqual(2);

	});
	it('should get items from convertArrayToItems - return 0', () => {
		const testObjReturn = ms.convertArrayToItems([]);
	  	expect(testObjReturn.length).toEqual(0);

	});
	it('should get items from convertObjectToItem PAGES_MENU', () => {
		const testObjReturn = ms.convertObjectToItem(PAGES_MENU[0].children);
	  	expect(testObjReturn.route[0].path).toEqual('user-administration');

	});
	it('should get items from convertObjectToItem FIELD_MENU', () => {
		const testObjReturn = ms.convertObjectToItem(FIELD_MENU[0].children);
	  	expect(testObjReturn.route[0].path).toEqual(['/project-management/field-report-detail/weather']);

	});
	it('should get items from convertObjectToItem FIELD_MENU_NO_ARRAY', () => {
		const testObjReturn = ms.convertObjectToItem(FIELD_MENU_NO_ARRAY[0].children);
	  	expect(testObjReturn.route[0].path).toEqual('/project-management/field-report-detail/weather');

	});
	it('should get items from convertObjectToItem - PAGES_MENU_SKIP_NO_DATA', () => {
		const testObjReturn = ms.convertObjectToItem(PAGES_MENU_SKIP_NO_DATA[0].children);
	  	expect(testObjReturn.skip).toEqual(true);

	});
	it('should get items from addChildItem - PAGES_MENU', () => {
		const testObjReturn = ms.addChildItem(PAGES_MENU, 'tony', 'forever young', '1');
	  	expect(testObjReturn).toEqual(PAGES_MENU);

	});
	it('should get items from addChildItem - FIELD_MENU - no match', () => {
		const testObjReturn = ms.addChildItem(FIELD_MENU, 'tony', 'forever young', '8');
	  	expect(testObjReturn).toEqual(FIELD_MENU);

	});
	it('should get items from addChildItem - FIELD_MENU - match', () => {
		const testObjReturn = ms.addChildItem(FIELD_MENU, '/project-management/field-report-detail/weather', 'forever young', '1');
		console.log(testObjReturn)
	  	expect(testObjReturn).toEqual(FIELD_MENU);

	});
	it('should get items from addChildItem - FIELD_MENU - match but duplicate - do not add twice', () => {
		let testObjReturn = ms.addChildItem(FIELD_MENU, '/project-management/field-report-detail/weather', 'forever young', '1');
		testObjReturn = ms.addChildItem(FIELD_MENU, '/project-management/field-report-detail/weather', 'forever young', '1');
		console.log(testObjReturn)
	  	expect(testObjReturn).toEqual(FIELD_MENU);

	});
	it('should remove items from removeChildItem - FIELD_MENU ', () => {
		let testObjReturn = ms.removeChildItem(FIELD_MENU, '/project-management/field-report-detail/weather');
		console.log(testObjReturn)
	  	expect(testObjReturn).toEqual(FIELD_MENU);

	});

	it('should not change items from renameChildItem - FIELD_MENU', () => {
		let testObjReturn = ms.renameChildItem(FIELD_MENU, '/logic-management/field-report-detail/notes', '/project-management/field-report-detail/notes/14374/Work Completed/1491848796452','forever young');
	  	expect(testObjReturn).toEqual(FIELD_MENU);

	});
	it('should not change items from renameChildItem - FIELD_MENU - no children', () => {
		let testObjReturn = ms.renameChildItem(FIELD_MENU, '/project-management/field-report-detail/weather', '/project-management/field-report-detail/notes/14374/Work Completed/1491848796452','forever young');
	  	expect(testObjReturn).toEqual(FIELD_MENU);

	});
	it('should change items from renameChildItem - FIELD_MENU', () => {
		let testObjReturn = ms.renameChildItem(FIELD_MENU, '/project-management/field-report-detail/notes', '/project-management/field-report-detail/notes/14374/Work Completed/1491848796452','forever young');
	  	expect(testObjReturn[0].children[2].children[0].data.menu.title).toEqual('forever young');

	});

	// it('should get items from prepareItem', () => {
	// 	ms.router.createUrlTree = ()=>{return 'tony'};
	// 	ms.router.serializeUrl = ()=>{return 'tony'};
	//   	const preparedItemObj = ms.prepareItem(prepare)
	//   	expect(preparedItemObj.title).toEqual('Dashboard');

	// });
	// it('should false from selected', () => {
	// 	ms.router = {
	// 			url:'tones',
	// 			createUrlTree:  ()=>{},
	// 			isActive:  ()=>{ return false },

	// 		};
	// 	const testObjReturn = ms.selectItem(testObj);		
	//   	expect(testObjReturn.selected).toEqual(false);

	// });


});