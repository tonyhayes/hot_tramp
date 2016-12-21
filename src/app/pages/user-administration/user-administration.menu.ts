export const ADMIN_MENU = [
	{
		path: 'pages',
		children: [
			{
				path: 'dashboard',
				data: {
					menu: {
						title: 'Dashboard',
						icon: 'ion-android-home',
						selected: false,
						expanded: false,
						order: 0
					}
				}
			},

			{
				path: 'tables',
				data: {
					menu: {
						title: 'Tables',
						icon: 'ion-grid',
						selected: false,
						expanded: false,
						order: 500,
					}
				},
				children: [
					{
						path: 'basictables',
						data: {
							menu: {
								title: 'Basic Tables',
							}
						}
					},
					{
						path: 'smarttables',
						data: {
							menu: {
								title: 'Smart Tables',
							}
						}
					},
					{
						path: 'richgrid',
						data: {
							menu: {
								title: 'Rich Grid',
							}
						}
					}
				]
			},
			{
				path: '',
				data: {
					menu: {
						title: 'Menu Level 1',
						icon: 'ion-ios-more',
						selected: false,
						expanded: false,
						order: 700,
					}
				},
				children: [
					{
						path: '',
						data: {
							menu: {
								title: 'Menu Level 1.1',
								url: '#'
							}
						}
					},
					{
						path: '',
						data: {
							menu: {
								title: 'Menu Level 1.2',
								url: '#'
							}
						},
						children: [
							{
								path: '',
								data: {
									menu: {
										title: 'Menu Level 1.2.1',
										url: '#'
									}
								}
							}
						]
					}
				]
			},
			{
				path: '',
				data: {
					menu: {
						title: 'External Link',
						url: 'http://www.dexterchaney.com',
						icon: 'ion-android-exit',
						order: 800,
						target: '_blank'
					}
				}
			}
		]
	}
];
