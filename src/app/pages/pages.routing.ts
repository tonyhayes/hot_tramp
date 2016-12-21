import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { AuthGuard } from '../auth-guard.service';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
	{
		path: 'login',
		canActivate: [AuthGuard],
		loadChildren: () => System.import('./login/login.module')
	},
	{
		path: 'register',
		canActivate: [AuthGuard],
		loadChildren: () => System.import('./register/register.module')
	},
	{
		path: 'profile',
		canActivate: [AuthGuard],
		loadChildren: () => System.import('./profile/profile.module')
	},
	{
		path: 'project-management',
		canActivate: [AuthGuard],
		loadChildren: () => System.import('./project-management/project-management.module')
	},
	{
		path: 'user-administration',
		canActivate: [AuthGuard],
		loadChildren: () => System.import('./user-administration/user-administration.module')
	},
	{
		path: 'pages',
		component: Pages,
		canActivate: [AuthGuard],
		children: [
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
			{ path: 'editors', loadChildren: () => System.import('./editors/editors.module') },
			{ path: 'project-management', loadChildren: () => System.import('./project-management/project-management.module') },
			{ path: 'user-administration', loadChildren: () => System.import('./user-administration/user-administration.module') },
			//{ path: 'components', loadChildren: () => System.import('./components/components.module') }
			{ path: 'charts', loadChildren: () => System.import('./charts/charts.module') },
			{ path: 'ui', loadChildren: () => System.import('./ui/ui.module') },
			{ path: 'forms', loadChildren: () => System.import('./forms/forms.module') },
			{ path: 'tables', loadChildren: () => System.import('./tables/tables.module') },
			{ path: 'maps', loadChildren: () => System.import('./maps/maps.module') }
		]
	}
];

export const routing = RouterModule.forChild(routes);
