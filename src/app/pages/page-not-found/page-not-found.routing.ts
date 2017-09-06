
import { Routes, RouterModule }  from '@angular/router';
import { AuthGuard } from '../../auth-guard.service';

import { PageNotFound } from './page-not-found.component';


const routes: Routes = [
	{
		path: '',
//		canActivate: [AuthGuard],
		component: PageNotFound,
	}
];

export const routing = RouterModule.forChild(routes);
