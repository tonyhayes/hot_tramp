
import { Routes, RouterModule }  from '@angular/router';
import { AuthGuard } from '../../auth-guard.service';

import { LoggedOut } from './logged-out.component';


const routes: Routes = [
	{
		path: '',
//		canActivate: [AuthGuard],
		component: LoggedOut,
	}
];

export const routing = RouterModule.forChild(routes);
