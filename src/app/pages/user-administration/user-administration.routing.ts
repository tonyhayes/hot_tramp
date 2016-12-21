
import { Routes, RouterModule }  from '@angular/router';

import { UserAdministration } from './user-administration.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  	{
    	path: '',
    	component: UserAdministration
  	}
];

export const routing = RouterModule.forChild(routes);
