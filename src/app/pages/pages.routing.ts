import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { AuthGuard } from '../auth-guard.service';
import { Util } from '../framework/helpers/util';
// noinspection TypeScriptValidateTypes
const adminRoutes: Routes = [
	{
		path: 'user-administration',
//		canActivate: [AuthGuard],
		loadChildren: './user-administration/user-administration.module'
	},
	{
		path: 'pages',
		component: Pages,
		children: [
			{ path: '', redirectTo: 'pages', pathMatch: 'full' },
			{ path: 'user-administration', loadChildren:'./user-administration/user-administration.module' },
		]
	}
];
const pmRoutes: Routes = [
	{
		path: 'project-management',
//		canActivate: [AuthGuard],
		loadChildren: './project-management/project-management.module'
	},
	{
		path: 'project-management-administration',
//		canActivate: [AuthGuard],
		loadChildren: './project-management-administration/project-management-administration.module'
	},
	{
		path: 'pages',
		component: Pages,
		children: [
			{ path: '', redirectTo: 'pages', pathMatch: 'full' },
			{ path: 'project-management', loadChildren:'./project-management/project-management.module' },
			{ path: 'project-management-administration', loadChildren:'./project-management-administration/project-management-administration.module' },
		]
	}
];
const getRoutes = ()=>{
  	const app = Util.getAppDetails()

	if(app.APP_NAME == 'PM'){
		return pmRoutes
	}
	return adminRoutes;
}
export const routing = RouterModule.forChild(getRoutes());
