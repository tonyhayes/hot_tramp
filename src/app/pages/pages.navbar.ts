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
