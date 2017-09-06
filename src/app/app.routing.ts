import { Routes, RouterModule } from '@angular/router';
import { Util } from './framework/helpers/util';

const adminRoutes: Routes = [
	{ path: 'user-administration/user-list', redirectTo: '/user-administration/user-list', pathMatch: 'full' },
	{ path: 'user-administration', redirectTo: '/user-administration/user-list', pathMatch: 'full' },
	{ path: '', redirectTo: '/user-administration/user-list', pathMatch: 'full' },
	{ path: '**', redirectTo: '/user-administration' }
];
const pmRoutes: Routes = [
	{ path: 'project-management', redirectTo: '/project-management', pathMatch: 'full' },
	{ path: 'project-management-administration/dashboard', redirectTo: '/project-management-administration/dashboard', pathMatch: 'full' },
	{ path: 'project-management-administration', redirectTo: '/project-management-administration', pathMatch: 'full' },
	{ path: '', redirectTo: '/project-management', pathMatch: 'full' },
	{ path: '**', redirectTo: '/project-management' }
];
const getRoutes = ()=>{
  	const app = Util.getAppDetails()

	if(app.APP_NAME == 'PM'){
		return pmRoutes
	}
	return adminRoutes;
}

export const routing = RouterModule.forRoot(getRoutes());
