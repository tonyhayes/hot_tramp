
import { Routes, RouterModule }  from '@angular/router';
import { AuthGuard } from '../../auth-guard.service';

import { UserAdministration } from './user-administration.component';
import { UserList } from './components/user-list/user-list.component';
import { UserDetails } from './components/user-details/user-details.component';


const routes: Routes = [
	{
		path: '',
//		canActivate: [AuthGuard],
		component: UserAdministration,
		children: [
			{ path: '', component: UserList },
			{ path: 'user-list', component: UserList },
			{ path: 'user-details/:id', component: UserDetails },
//			{ path: '**', component: UserList },
		]
	}
];

export const routing = RouterModule.forChild(routes);
