
import { Routes, RouterModule }  from '@angular/router';

import { ProjectManagement } from './project-management.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  	{
    	path: '',
    	component: ProjectManagement
  	}
];

export const routing = RouterModule.forChild(routes);
