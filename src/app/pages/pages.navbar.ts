export const PAGES_NAVBAR = [
	{
		path: 'pages',
		children: [
			{
				path: 'dashboard',
				data: {
					navbar: {
						title: 'Dashboard',
						icon: 'ion-android-home',
						selected: true,
						order: 0
					}
				}
			},
			{
				path: 'project-management',
				data: {
					navbar: {
						title: 'Project Management',
						icon: 'ion-android-options',
						selected: true,
						order: 10
					}
				}
			},
			{
				path: 'user-administration',
				data: {
					navbar: {
						title: 'User Administration',
						icon: 'ion-person-stalker',
						selected: true,
						order: 20
					}
				}
			},
			{
				path: '',
				data: {
					navbar: {
						title: 'External Link',
						url: 'http://www.dexterchaney.com/',
						icon: 'ion-android-exit',
						order: 100,
						target: '_blank'
					}
				}
			}
		]
	}
];
